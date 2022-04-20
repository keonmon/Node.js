// 01_Server01.js

// Node.js에 포함된 기능과 문법을 이용해서 웹호스팅을 할 수 있는 서버를 구축합니다.

const http = require('http');
// 서버 구축에 피룡한 기능과 함수를 담고있는 http모듈을 require 한다.

// createServer 함수 : Node.js 자바스크립트로 만든 http서버가 실행되게 하는 함수.
// (req, res)=>{ } : 서버에 클라이언트가 요청이 있을 때 실행할 명령들이 들어간다.
// req, res를 전달받은 익명함수가 클라이언트로 부터 들어온 요청에 응답한다.

http.createServer( (req, res)=>{
    // req는 요청을 받고, res는 응답을 한다.
    res.write('<h1>Hello Node Server!!</h1>');
    res.write('<h2>Welcome to my Node Server!!</h2>');

} )
.listen(8090, ()=>{ console.log('8090포트에서 서버가 대기중입니다.');  } );

//.listen(8090, ()=>{} ) 에 있는 '()=>{ }' 는 서버가 시작되면 실행할 명령이 들어간다.
// 8090 : 클라이언트가 요청할 포트번호


