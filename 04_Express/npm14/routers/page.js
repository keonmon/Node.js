const express = require('express');
const { Post, User, Hashtag } = require('../models');
const router = express.Router();

// 로그인 페이지로 이동 ('/')
router.get('/', async (req, res, next)=>{
    try{
        //포스트 검색
        const posts = await Post.findAll({
            include:{
                model:User,
                attributes:['id', 'nick'],
            },
            order:[[ 'createdAt', 'DESC' ]],
        });
        res.render('main',
            { 
                title:'Nodegram',     // 타이틀
                user:req.user,      // 로그인유저 객체
                followerCount:0,    // 로그인 유저의 팔로워 수
                followingCount:0,   // 로그인 유저의 팔로잉 수
                followerIdList:[],  // 팔로워 리스트 (배열)
                posts,           // 전체 포스팅 객체
            }
        );
    }catch(err){
        console.error(err);
        next(err);
    }
});

// 회원가입 폼 블럭으로 이동
router.get('/join', (req,res,next)=>{
    res.render('join', 
        {
            title:'회원가입-Nodegram',
        }
    );
});

// 내 프로필로 이동
router.get('/profile',(req,res)=>{
    res.render('profile',{
        title:'내 프로필 - Nodegram',
        user:req.user,
        followerCount : 0,
        followingCount:0,
        followerIdList:[],
    });
});

// 해시태그 검색
router.get('/hashtag', async (req,res,next)=>{
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');   // 도착한 검색어가 없으면 메인으로 redirect
    }
    try {
        // 해시태그 단어 검색
        const hashtag = await Hashtag.findOne({ where:{ title:query, } });
        let posts = [];
        if(hashtag){
            // 해당 해시태그로 외래키인 게시물들을 검색
            posts = await hashtag.getPosts({ include: [{model:User }] });
        }
        return res.render('main', {
            title:`${query} | NodeGram`,
            posts,
            user:req.user,
            followerCount:0,
            followingCount:0,
            followerIdList:[],
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});


module.exports = router;