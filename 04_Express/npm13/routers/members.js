const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const router = express.Router();

// 로그인 동작
router.post('/login', async (req, res, next)=>{
    try{
        const luser = await Member.findOne({
            // 전달된 아이디와 같은 레코드 검색 후 luser변수에 저장
            where:{userid : req.body.userid },
        });
        if( (luser != null) && (luser.pwd == req.body.pwd) ){
            req.session.loginUser = luser;
        }
        res.json(luser);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/joinform', (req, res, next)=>{
    res.render('memberInsert',{});
});

router.post('/insertMember', async (req,res,next)=>{
    try{
        await Member.create({
            userid:req.body.userid,
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        });
        res.end();
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/updateForm/:userid', async (req,res,next)=>{
    // userid로 검색해서 검색 결과를 member라는 이름으로 같이 memberUpdateForm.html로 전송 이동.
    try{
        const member = await Member.findOne({
            where : { userid : req.params.userid, }
        });
        res.render('memberUpdateForm', {member});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/update', async(req, res, next)=>{
    try{
        // 회원정보 수정
        const result = await Member.update({    // result에는 변경된 건수가 담김
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        },
        {
            where : { userid : req.body.userid, }
        });

        // 회원정보 조회하여 세션 저장
        const member = await Member.findOne({
            where : { userid : req.body.userid, }
        });
        req.session.loginUser = member;
        res.json(member);   // 종료의 의미 ( 보내는 것에는 크게 의미없음. )

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;