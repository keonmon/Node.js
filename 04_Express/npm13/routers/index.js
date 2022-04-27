const express = require('express');
const Member = require('../models/member'); // 경로는 소문자인데 왜 확인하면 대문자지?
const Board = require('../models/board');
const Reply = require('../models/reply');
const router = express.Router();

// login.html을 표시하는 동작
router.get('/', (req, res, next)=>{
    try{
        res.render('login',{});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;