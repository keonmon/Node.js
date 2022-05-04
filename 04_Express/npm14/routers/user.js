const express = require('express');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();

// 로그인유저(나)가 전달된 :id 상대를 팔로우한다.
router.post('/follow/:id', isLoggedIn, async (req,res,next)=>{
    const loginuser = await User.findOne({
        where:{id:req.user.id},
    }); //로그인 유저의 user정보 조회

    if(loginuser){
        await loginuser.addFollowings( parseInt(req.params.id, 10) );
        // as : 'Followings'에 따른 메서드가 만들어짐. 복수,단수 모두 가능하다 setFollowing 수정메서드
        // getFollowings, removeFollowings 복수면 []를 사용한다.
        res.send('success');
    }else{
        res.status(404).send('no user');
    }
});

module.exports = router;