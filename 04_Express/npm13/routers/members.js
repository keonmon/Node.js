const express = require('express');
const Member = require('../models/Member');
const Board = require('../models/Board');
const Reply = require('../models/Reply');
const router = express.Router;

router.post('/login', async (req, res)=>{
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