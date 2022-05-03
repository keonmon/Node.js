const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = ()=>{
    passport.serializeUser((user, done)=>{  //정상적으로 로그인 되었을 때 실행
        console.log('정상적으로 로그인되어 serializeUser 시작');
        done(null,user.id); // 세션에 아이디만 저장하는 동작.
        //이동 직후 '세션에 아이디가 저장된다'라는 것은 세션쿠키에도 암호화된 키로 쿠키가 저장된다는 뜻이다.
        // {id:3, 'condect.sid:12424123 } 세션쿠키와 같은 세션쿠키가 생성되면서
        // 브라우저에서 connect.sid값의 쿠키가 관리되고 이후로는 아래 디시리얼라이즈유저로 아이디가 사용(세션값으로 복구 및 사용)된다.
    });

    passport.deserializeUser((id, done)=>{
        console.log('deserializeUser 시작');
        // 세션쿠키를 사용할 때, 로그인 후 부터 사용한다.
        // 세션쿠키로 로그인된 사람이 req.user에 저장되는데, 차후에 추가로 그의 정보와 팔로워 팔로잉도 조인된 결과로 저장된다.
        User.findOne({
            where:{id},
        })
        // 세션에 저장된 아이디와 쿠키로 user를 복구, req.user로 사용
        .then(user=> done(null,user))

        // req.isAuthenticated()함수 결과 : 로그인되어있는 동안 트루값을 갖게된다.
        .catch(err => done(err));
    });
    
    local();
};