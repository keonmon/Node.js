const express = require('express');
const Member = require('../models/member'); // 경로는 소문자인데 왜 확인하면 대문자지?
const Board = require('../models/board');
const Reply = require('../models/reply');

// 직접 사용할 라우터파일에서 필요한 require를 사용하는 것이 효율적일 수 있다.
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// 파일이 업로드 될 폴더 설정(없으면 새로 만듦)
// upload폴더를 public에 넣는 이유는, public이 static이기 때문
try{
    fs.readdirSync('public/upload');
}catch(error){
    console.error('upload폴더가 없어 upload폴더를 생성');
    fs.mkdirSync('public/upload');
}

// multer객체 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,done){
            done(null, 'public/upload/');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname,ext)+Date.now() + ext);
        },
    }),
    limits:{fileSize:5*1024*1024},
});

// 로그인 후 보여질 main화면 (main.html)
router.get('/', (req,res)=>{
    const loginUser = req.session.loginUser;
    res.render('main', {lUser:loginUser});
});

// 게시물 전체 조회
router.get('/boardList', async (req,res,next)=>{
    // boards테이블의 모든 내용을 id로 내림차순 조회하여 json으로 보낸다.
    try {
        const boardList = await Board.findAll({
            order : [['id','desc']],
        }); 
        res.json(boardList);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시글 등록 폼으로 이동
router.get('/writeForm', (req, res, next)=>{
    const luser = req.session.loginUser;
    res.render('writeForm', {luser});
});

// 게시글 등록 동작
router.post('/writeBoard', upload.single('image'), async (req,res,next)=>{
    // 파일 업로드와 게시글 insert를 완성. 
    // filename필드명에는 서버에 저장되는 파일명(현재날짜와 시간이 밀리초로 변환된 값 + 파일명
    // realfilename 필드명에는 원래 파일명
    try {
        if(req.file != undefined){
            const board = await Board.create({
                subject : req.body.subject,
                writer : req.body.writer,
                content : req.body.text,
                filename : req.file.originalname,
                realfilename : req.file.filename,
            });
            res.json(board);

        }else{
            const board = await Board.create({
                subject : req.body.subject,
                writer : req.body.writer,
                content : req.body.text,
            });
            res.json(board);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시물 보기
router.get('/boardView/:id', async (req, res,next)=>{
    try {
        // 게시물 검색
        const result = await Board.findOne({
            attributes:['readCount'],
            where:{id:req.params.id},
        });

        // 검색한 게시물의 조회수를 추출하여 +1 연산
        const cnt = result.readCount + 1;
        
        // 조회수 연산결과를 게시물에 update
        await Board.update({
            readCount:cnt,
        },
        {
            where:{id:req.params.id},
        });

        // 게시물을 재검색
        const board = await Board.findOne({
            where:{id:req.params.id},
        });

        // render로 전송
        const luser = req.session.loginUser;
        const dt = new Date();
        res.render('boardView', {board, luser, dt});

    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시물의 댓글들 조회
router.get('/replyList/:boardnum', async (req, res, next)=>{
    try {
        const replys = await Reply.findAll({
            where:{boardnum:req.params.boardnum},
            order:[['id','DESC']],
        });
        res.json(replys);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 작성
router.post('/addReply', async (req, res, next)=>{
    try {
        await Reply.create({
            writer:req.body.writer,
            content:req.body.reply,
            boardnum:req.body.boardnum,
        });
        res.end();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글 삭제
router.delete('/deleteReply/:id', async (req, res, next)=>{
    try {
        const result = await Reply.destroy({
            where:{id:req.params.id}
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 댓글개수 조회
router.get('/replycnt/:id', async (req, res, next)=>{
    try {
        const result = await Reply.findAll({
            where:{boardnum:req.params.id},
        });
        //res.json(result);
        res.json({cnt:result.length})
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시물 수정폼으로 이동
router.get('/updateForm/:id', async (req,res,next)=>{
    // 전달된 아이디로 게시물을 조회한 후 updateForm.html로 렌더링, 
    // 세션에 있는 '유저아이디'와 조회한 게시물이 같이 이동한다.
    try{
        const board = await Board.findOne({
            where:{id:req.params.id},
        });
        const luser = req.session.loginUser;    // loginUser 세션을 가져와 저장
        res.render('updateForm',{board, luser});
    }catch(err){
        console.error(err);
        next(err);
    }
});

// 게시물 수정
router.post('/update', upload.single('image'), async (req,res,next)=>{
    try {
        if(req.file != undefined){
            // 업로드된 파일이 있다면 (undefined가 아니라면)
            await Board.update({
                subject:req.body.subject,
                content:req.body.text,
                filename:req.file.originalname,
                realfilename:req.file.filename,
            },{
                where : {id:req.body.id},
            });
        }else{
            // 업로드된 파일이 없다면 (undefined라면)
            await Board.update({
                subject:req.body.subject,
                content:req.body.text,
            },{
                where : {id:req.body.id},
            });
        }
        res.end();
        // axios를 사용했기 때문에 redirect코드는 의미 없음
        // res.redirect('/boards/boardView2/'+ req.body.id);
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시물 보기 ( 조회수 카운트X )
router.get('/boardView2/:id', async (req, res,next)=>{
    try {
        // 게시물을 검색
        const board = await Board.findOne({
            where:{id:req.params.id},
        });

        // render로 전송
        const luser = req.session.loginUser;
        const dt = new Date();
        res.render('boardView', {board, luser, dt});

    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 게시물 삭제
router.get('/deleteBoard/:id', async (req,res,next)=>{
    try {
        await Board.destroy({
            where:{id:req.params.id},
        });
        res.redirect('/boards');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;