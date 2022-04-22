const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res)=>{
    // __dirname의 내용과 index.html파일명이 조합된 종합경로가 만들어지고 
    // 해당 파일의 내용으로 클라이언트에 응답할 예정.
    // 02_Internal_Module의 path 파일내용을 참고

    // 파일을 열어서 내용을 꺼내어 클라이언트에게 보내주는것이 아닌, 파일 자체를 보낸다.
    // 사용되는 메서드 res.sendFile();
    console.log('__dirname의 경로 : ' + path.join(__dirname));  // D:\Java\00_JS\04_Express\npm02
    res.sendFile( path.join(__dirname, '/index.html') );        // 'D:\Java\00_JS\04_Express\npm02' + /index.html
});

app.get('/users', (req, res)=>{});
// 이와 같은 함수를 라우터라고 부른다.
// 하나의 라우터에는 method와 url이 같이 표시되어 해당 내용으로 응답을 보내준다.

app.listen(app.get('port'), ()=>{ console.log( app.get('port'),'번 포트에서 대기중입니다.'); }) ;