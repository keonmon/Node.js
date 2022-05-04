const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();

try{
    fs.readdirSync('uploads');
}catch(error){
    console.error('upload폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname,ext)+Date.now()+ext);
        },
    }),
    limits:{fieldSize:5*1024*1024},
});


// 이미지파일을 서버에 업로드하는 동작
router.post('/img', upload.single('img'), (req,res,next)=>{
    console.log( `/img/${req.file.filename}` );
    res.json({ url:`/img/${req.file.filename}` });
}); // 이미지만 업로드하고, 저장된 경로를 json형식으로 되돌려준다.


// 포스팅 동작
const upload2 = multer();
// 폼 내부에 <input type="file"이 있기 때문에 submit할 경우 파일을 한번 더 업로드하려고 동작한다.
// 따라서 file업로드 동작을 생략하기 위해 비어있는 multer객체를 생성하고, upload2.none()를 한다.
router.post('/', isLoggedIn, upload2.none(), async(req,res)=>{
    try {
        const currentPost = await Post.create({
            content: req.body.content,
            img:req.body.url,
            UserId:req.user.id,
        });

        // 게시물을 포스팅할 때 같이 입력한 해시태그(#)를 골라내어, 단어별로 처음 나온 단어를 해시태그 테이블에 insert하고,
        // 현재 게시물이 어떤 해시태그를 갖고 있는지의 여부를 posthashtags테이블에 insert한다. 

        // ** '정규표현식'을 사용한다! ** 

        // ↓ '#'으로 시작해서 빈칸과 '#'이 아닌 곳까지를 단어로 하여 모두 검색한다.
        const hashtags = req.body.content.match(/#[^\s#]*/g);

        if(hashtags){
            // 추출한 해시태그가 있다면~
            const result = await Promise.all(
                hashtags.map((tag)=>{
                    return Hashtag.findOrCreate({

                        //slice(1) -> title 필드값이 해시태그 중 하나(tag)의 내용 중 #을 제외한 나머지 글자와 같은 조건으로 검색한다.
                        // 같은 title값이 있으면, 지나가고, 없으면 Hashtag테이블에 현재 해시태그로 레코드를 추가하고 그 값으로 리턴한다.
                        where:{title:tag.slice(1).toLowerCase()},   
                    });
                }),
            );
            await currentPost.addHashtags(result.map( (r) => r[0] ) );
            // 지금 추가한 post게시물에 대한 해시태그로 해시태그들을 posthashtags테이블에 추가

            // addHashtags : Post모델과, Hashtag모델의 관계에서 Post모델에 자동 생성된 메서드 - Hashtag테이블에 데이터를 추가하는 메서드
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;