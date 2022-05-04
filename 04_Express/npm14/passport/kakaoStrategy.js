const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user')

module.exports = () =>{
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done)=>{
        console.log( 'kakao profile', profile );
        // profile:계정이 동의한 항목들이 들어있는 카카오가 보내준 객체(카카오 이메일주소, 카카오 닉네임, 나이, 성명, 성별 등)
        try{
            const exUser = await User.findOne({
                where : { snsid:profile.id, provider:'kakao' },   //카카오 아이디 검색
            });
            if(exUser){
                done(null, exUser); // 아이디가 존재하면 검색결과 회원정보(exUser)를 갖고 바로 done(null, exUser)로 돌아가 로그인절차(세션쿠키저장 등)을 실행한다.
            }else{
                // 아이디가 없으면 아래와 같이 회원을 Users테이블에 추가하고 로그인절차를 진행
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsid: profile.id,
                    provider: 'kakao',
                });     // 회원가입 후, 로그인 절차가 진행
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};