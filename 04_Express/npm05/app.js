const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

// 추가모듈 설정
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// 포트설정
app.set('port', process.env.PORT || 3000);

// 라우팅
// 루트 라우터
app.get('/', (req, res)=>{

    if(req.cookies.id){
        res.send(`${req.cookies.id} 님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    } else {
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

// 로그인 라우터
app.post('/login',(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pw;

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);

    if( id=='scott' && pw == 'tiger'){
        res.cookie('id', id, {
            expires : expires,
            httpOnly : true,
            path : '/'
        });
        return res.json( {msg : 'ok'} );  //json 데이터를 갖고 호출위치로 돌아간다.

    }else if(id!='scott'){
        return res.json({msg:'없는 아이디입니다.'});

    }else if(pw!='tiger'){
        return res.json({msg:'비밀번호 오류입니다.'});

    }else {
        return res.json({msg:'알수없는 오류'});
    }
});

// 로그아웃 라우터
app.get('/logout', (req,res)=>{
    res.clearCookie('id', req.cookies.id,{
        httpOnly : true,
        path : '/'
    });
    res.redirect('/');
})


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});