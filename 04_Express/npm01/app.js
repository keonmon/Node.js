const express = require("express");

const app = express();  //서버 객체를 변수에 저장

app.set('port', process.env.PORT || 3000);
// 서버내에서 port라는 변수를 만들어서 현재 환경의 포트 
// 또는 포트가 지정되지 않았다면 3000을 저장한다.

app.get('/', (req, res)=>{
    res.send('<h1>Hello, ExpressServer</h1>');
});

app.get("/login", (req, res)=>{
    // 로그인 관련 페이지 동작
});

app.listen(app.get('port'), ()=>{ console.log(app.get('port'), '번 포트에서 대기중입니다.');})
// app.listen(3000, ()=>{ console.log(3000, '번 포트에서 대기중입니다.');})

// 서버 구동에 핵심이 되는 파일 app.js 중요 메서드
// app.set('port', 포트)로 서버가 실행될 포트 지정
// app.get('키워드', 익명함수)로 GET요청이 올 때 어떤 동작을 할지 지정
// app/get('포트', 익명함수)로 몇 번 포트에서 서버를 실행할지 지정

//express 서버 구동 순서
// 1. npm init
// 2. npm i express
// 3. npm i -D nodemon : 개발환경용이므로 필수 사항은 아니다.
// 4. app.js 또는 index.js 또는 main에 지정한 파일 (서버의 시작파일)을 제작
// 5. package.json의 scripts에 "start" : "nodemon app"을 추가
// 6. npm app 또는 npm run start(npm start)로 서버를 시작한다.

// nodemon의 이점
// 1. 서버구동 및 운용에 발생한 모든 과정을 로깅으로 보여준다.
// 2. 에러 수정이 용이하다.
// 3. 일정 시간이 지나거나 주요파일이 저장되면 서버가 다시 재구동되므로, 수동으로 서버 재시작의 불편함이 없다.