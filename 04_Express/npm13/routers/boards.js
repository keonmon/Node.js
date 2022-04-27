const express = require('express');
const Member = require('../models/member'); // 경로는 소문자인데 왜 확인하면 대문자지?
const Board = require('../models/board');
const Reply = require('../models/reply');
const router = express.Router();

// 로그인 후 보여질 main화면 (main.html)
router.get('/', (req,res)=>{
    const loginUser = req.session.loginUser;
    res.render('main', {lUser:loginUser});
});

router.get('/boardList',(req,res)=>{
    
})

module.exports = router;