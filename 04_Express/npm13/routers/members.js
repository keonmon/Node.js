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

module.exports = router;