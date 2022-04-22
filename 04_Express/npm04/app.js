const express = require('express');
const path = require('path');

// 추가 모듈 설치 ------------------
// 각각의 요청과 응답에 대한 필요정보를 보기 위한모듈
const morgan = require('morgan');

//쿠키사용을 보다 간결하게 사용하기 위한 모듈
const cookieParser = require('cookie-parser');

// 세션사용을 보다 간결하게 사용하기 위한 모듈
const session = require('express-session');

// 요청의 본문을 해석, 구분하는 모듈
const bodyParser = require('body-parser');



// express 설정
const app = express();

app.set('port', process.env.PORT || 3000);


// 공통 미들웨어 설정 ------------

app.use(morgan('dev'));
// 실행결과 : GET / 200 5.316 ms - 165
// method방식, 응답결과코드, 요청과실행에 걸린 시간 등등
// app.use(morgan('combined')); 더 자세한 내용을 볼 수도 있다.

app.use(cookieParser());
app.use(express.json());    //바디파서 json : json 사용을 위한 모듈
app.use(express.urlencoded({extended:true}));   //바디파서 폼데이터 모듈
//app.use(body-Parser.json());
//app.use(body-Parser.urlencoded({extend : false}));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'keonhee',
}));    //세션 활용을 위한 미들웨어
// ---------------------------------------------------


app.get('/', (req, res)=>{
    // http 서버에서 쿠키를 얻어오거나 저장하는 방식
    /*
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookies' : 'mycookie=test'});
    res.writeHead(302, {Location:'/', 'Set-Cookies' : `name=${encoderURIComponent(name)}`});
    Expires=${Expires.toGMTString()}; HttpOnly; Path='/';
    */

    /*
    // ** express 서버에서 쿠키를 읽어오거나 저장하는 방식 **
    // 1. 저장된 쿠키를 불러와서 활용할 변수 req.cookies
    console.log(req.cookies);
    // 2. 새로운 쿠키의 저장
    const name = 'HongGillDong';
    res.cookies('name', encodeURIComponent(name),{
        expires:new Date(),
        httpOnly : true,
        path:'/'
    });
    // 3. 쿠키의 삭제
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly:true,
        path:'/'
    });
   

    console.log(req.cookies);
    console.log(req.cookies.test);
    res.cookie('test', 'cookietest',{
        httpOnly:true,
        path:'/'
    });
    */
    res.sendFile(path.join(__dirname,'/index.html'));

    // id라는 이름의 쿠키가 있으면 ' 000님 반갑습니다 ' 를 send
    if(req.cookies.id){
        res.send(`${req.cookies.id}님 안녕하세요` + '<br><a href="/logout">로그아웃</a>');
    }else{  // id 쿠키가 없으면 index.html을  send
        res.sendFile(path.join(__dirname, '/index.html'));
    }

});


app.post('/login',(req,res)=>{
    // post이기 때문에 localhost:3000/login 까지만 보여진다.
    // http 서버에서 전달 파라미터를 분해하는 관정
    // const { query } = url.parse(req.url);
    // const { name } = qs.parse(query);

    //express 서버에서 전달 파라미터를 활용하는 과정
    // console.log(req.body.name);
    const name = req.body.name;

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);

    res.cookie( 'id', name, {
        expires : expires,
        httpOnly : true,
        path:'/'
    }); // 파라미터 내용을 쿠키로 추가

    res.redirect('/'); // redirect('/'); 특정 리퀘스트로 이동한다.
});

// id 쿠키를 지우고, '/'로 리다이렉트 하는 라우터를 만들어주세요
app.get('/logout',(req, res)=>{

    res.clearCookie('id', req.cookies.name, {
        httpOnly:true,
        path:'/'
    });
    res.redirect('/');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트 대기 중');
});

