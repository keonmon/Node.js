const express = require('express');

// 추가모듈 require
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);

// 추가모듈 설정
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// express-session 모듈 설정
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"keon",  // 세션값의 암호화 코드
}));

// 세션의 저장
// req.session.id = 'hello';
// req.session.data = 'asdfadf';
// 다른 미들웨어에서 req.session.data 라는 이름으로 사용가능 (영구적인 저장)


// 라우팅
app.get('/', (req, res)=>{
    if(req.session.userid){
        res.send(`${req.session.userid}님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname,'/index.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;

    if(id=='scott' && pw=='tiger'){
        req.session.userid = id;
        return res.json({msg:'ok'});
    }else if(id!='scott'){
        return res.json({msg:'없는 아이디'});
    }else if(pw!='tiger'){
        return res.json({msg:'비번 오류'});
    }else {
        return res.json({msg:'알수없느 ㄴ오류'});
    }
});

app.get('/logout', (req,res)=>{
    // 세션 삭제
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
});


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});