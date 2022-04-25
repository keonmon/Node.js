const express = require('express');

// 추가모듈
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');  // 추가1
const path = require('path');

// 비밀키 비공개를 위한 기본 환경 구성
dotenv.config();  // 추가2  

const app = express();
app.set('port', process.env.PORT || 3000);

// 쿠키 암호화(환경변수파일에서 키 받아옴)
app.use(cookieParser(process.env.COOKIE_SECRET));  // 추가3 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 설정
app.use(session({
    resave: false,
    saveUninitialized: false,
    //secret: 'nodejsdotenv', // 세션을 발급할 때 사용되는 키.
    secret: process.env.COOKIE_SECRET,  // 세션 암호화(환경변수파일에서 키 받음)
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
}));


// 라우팅
app.get('/', (req, res)=>{
    if( req.session.userid ){
        res.send(`${req.session.userid} 님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    if( id=='scott' && pw=='tiger'){
        req.session.userid = id;
        return res.send('ok'); 
    }else if(id!='scott'){
        return res.send('없는 아이디입니다');
    }else if(pw!='tiger'){
        return res.send('비밀번호가 맞지 않습니다');
    }else{
        return res.send('알수없는 이유로 로그인 안됩니다.');
    }
});

app.get('/logout', (req, res)=>{
    req.session.destroy(function(){ 
        req.session;
    });
    res.redirect('/');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});