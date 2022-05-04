// auth.js 주로 로그인에 관련한 내용
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();

//일반 회원가입 동작
router.post('/join', isNotLoggedIn, async(req,res,next)=>{
    // const email = req.body.email;
    // const nick = req.body.nick;
    // const password = req.body.password;
    // req.body객체 -> {email:'abc@abc.com', nick:'hong' password:'1234'}
    const { email, nick, password } = req.body;

    try{
        const exUser = await User.findOne({
            where:{email}
        }); // 전송된 email이 이미 가입된 이메일인지 조회
        if(exUser){
            //exUser가 null이 아니라면 (이미 회원 가입이 되어있다면)
            return res.redirect('/join?error=exist');
        }

        const hash = await bcrypt.hash(password, 12);
        // bcrypt로 비밀번호를 암호화한다.
        // 해시연산의 뜻 : 암호화와 비슷한 연산의 결과로 같은 원본 데이터라도 연산 결과가 절대 같은 결과가 나오지 않게 하는 연산.
        // 12 : 해시화를 하기 위한 복잡도 인수. 숫자가 클수록 해시화 암호화가 복잡해지고, 복구 연산도 오래걸린다. 12는 약 1초 정도의 시간이 걸린다.
        await User.create({
            email,
            nick,
            password:hash,
        }); //이메일, 닉네임, 패스워드로 회원 추가
        return res.redirect('/');   // main페이지로 이동
    }catch(err){
        console.error(err);
        next(err);
    }
});

// 로그인 동작
router.post('/login', isNotLoggedIn, (req,res,next)=>{
    // passport 모듈로 로그인을 구현한다.
    console.log('/login 라우터 동작');
    passport.authenticate('local', (authError, user, info)=>{
        // 로그인을 위해 현재 미들웨어가 실행되면, 
        // 'local'까지만 인식되어지고, passport/localStrategy라는 곳으로 이동하여 로그인을 처리한다.

        // done()에 의해 되돌아온 전달값으로 (authError, user, info)=>{}가 실행된다.
        if(authError){  // 서버에러가 있다면 서버에러 처리
            console.error(authError);
            return next(authError);
        }
        if(!user){  // user가 false라면 (로그인에 실패했다면)
            console.log('user가 false여서 로그인 실패');
            return res.redirect(`/?loginError=${info.message}`);
        }
        
        //여기서부터 정상 로그인
        return req.login(user, (loginError)=>{
            console.log('정상적으로 로그인에 성공');
            //req.login을 하는 순간 index.js로 이동한다. (로그인루틴 정상실행 - 실행 후 복귀)
            if(loginError){ //index.js에서 보낸 에러가 있다면 에러처리
                console.error(loginError);
                return next(loginError);
            }
            // 세션위치에서 세션쿠키가 브라우저로 보내어진다.
            console.log('세션 위치에서 세션쿠키가 브라우저로 보내짐');
            return res.redirect('/');
        });
    })(req,res,next)  // 미들웨어 속 미들웨어에는 (req,res,next)를 뒤에 붙인다.
});

//로그아웃
router.get('/logout', isLoggedIn, (req,res)=>{
    req.logout();   // 세션 쿠키 삭제
    req.session.destroy();
    res.redirect('/');
});


// 카카오톡으로 로그인
router.get('/kakao', passport.authenticate('kakao'));
// 스트레티지를 통해 카카오에 한번 갔다가 콜백을 받아 돌아온 뒤 콜백을 실행

// 카카오 콜백
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect:'/',
}), (req,res)=>{
    res.redirect('/');
});


module.exports = router;