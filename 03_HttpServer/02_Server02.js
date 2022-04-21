// 02_Server02.js

const http = require('http');

// create 서버함수로 서버기능을 실행시킨다. + 에러처리 구문도 추가한다.
// createServer 함수로 만든 서버 객체를 server 변수에 저장하고 기타설정은 server변수를 통해 별도로 실행한다.
const server = http.createServer((req, res)=>{
    // 서버 요청시 응답내용이 쓰여진다.
    res.write('<h1>Hello Node Server!!</h1>');
    res.write('<h2>Welcome to my Second Server!!</h2>');
    res.write('<h3>Welcome to my Node Server!!</h3>');
});

server.listen(8090, ()=>{
    console.log('8090번 포트에서 서버 대기중입니다.'); 
});    // 포트번호(8090) 설정 

// server.on('listening', ()=>{
//     console.log('8090번 포트에서 서버 대기중입니다.'); 
// });  // 기타설정1 : 서버 실행시 동작

server.on('error', (error)=>{
    console.error(error);
}) ;    // 기타설정2 : 에러처리
