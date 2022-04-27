const express = require('express');

const User = require('../models/user');     
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next)=>{
    try{
        const comment = await Comment.create({
            commenter:req.body.userid,
            comment:req.body.comment,

        });
        res.json(comment);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/', async (req,res,next)=>{
    try{
        const comments = await Comment.findAll({
            // join을 위해 주인공테이블과 외래키관계(1:N)관계 테이블의 모델을 include한다.
            // 이렇게 join 효과를 볼 수 있다.
            include :{
                model:User,
            },
        });
        res.json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
});

// user테이블과 comments테이블의 조인
// User.findAll({
//    include:{
//        model:comment
//    },
// });

// 댓글 수정 라우터
router.patch('/update/:id', async (req,res)=>{
    try{
        const result = await Comment.update({
            comment:req.body.comment,
        },
        {
            where:{ id:req.params.id },
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.delete('/delete/:id', async(req, res)=>{
    try{
        const result = await Comment.destroy({
            where:{ id : req.params.id }
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});


// 6. 수정 update users set comment = '바꿀내용' where id=2;
// User.Update({
//    comment : '바꿀내용',
//},
//{
//    where : {id:2},
//});

// 7. 삭제
// delete from users where id=2
//User.destroy({
//    where : {id:2},
//});


router.get('/search/:id', async (req, res,next)=>{
    try{
        const comments = await Comment.findAll({
            // join을 위해 주인공테이블과 외래키관계(1:N)관계 테이블의 모델을 include한다.
            // 이렇게 join 효과를 볼 수 있다.
            include :{
                model:User,
            },
            where : {commenter : req.params.id}
        });
        res.json(comments);

    }catch(err){
        console.error(err);
        next(err);
    }
} );
module.exports = router;