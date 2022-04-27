const express = require('express');
const Member = require('../models/Member');
const Board = require('../models/Board');
const Reply = require('../models/Reply');
const router = express.Router;


router.get('/', (req, res, next)=>{
    try{
        res.render('login',{});
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;