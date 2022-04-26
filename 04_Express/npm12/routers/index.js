const express = require('express');

// 데이터베이스 조작(insert, update, delete, select)를 위해 require한다.
const User = require('../models/user');     
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index', { });    //최초 서버 실행시 첫페이지 (sequelize.html로 응답)
});
module.exports = router;