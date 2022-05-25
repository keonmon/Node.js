// 06_Cookie_Server02.js

const http = require('http');
const fs = require('fs').promises;

const url = require('url');
const qs = require('querystring');
const { traceDeprecation } = require('process');

const parseCookies = (cookie='')=>
    cookie
        .split(';')  // cookie1=test1;cookie2=test2  -> cookie1=test1 cookie2=test2 
        // ';'으로 구분되어 전달된 쿠키를 분리한다.

        .map( v=>v.split('=') ) // v : cookie1 test1   v : cookie2 test2
        // v에 ';'로 분리된 쿠키들이 전달되고, 그들을 다시 '='로 분리하여 다시 v에 저장된다.
        
        .reduce((acc, [k, v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc
        }, { });
        // 그렇게 분리된 둘은 k와 v에 전달되어 객체 형태를 이루고 acc에 저장되어 최종객체 형태의 데이터로 리턴된다
        // 마지막 { } : 분리된 쿠키들이 [k, v]형태로 변형되어 "객체로 저장 취합된다"는 의미

http.createServer(async (req, res)=>{

    const cookies = parseCookies(req.headers.cookie);    //전달된 쿠키객체에서 각 쿠키들은 키:밸류로 가공하여 객체형식으로 변환 후 cookie 변수에 저장.
    console.log(cookies);
    //res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    //res.end('Hello Cookie');
    if(req.url.startsWith('/login')){   // url이 '/login'으로 시작하는 경우

        //쿼리스트링 분리
        const{query} = url.parse(req.url);
        //http://localhost:8090/login?name=홍길동 에서
        // name=홍길동 을 분리해서 query변수에 저장
        console.log(query);

        const {name } = qs.parse(query);
        // 쿠키 유효 시간을 위한 현재 날짜시간 데이터 생성
        const expires = new Date();
        // 쿠키의 유효시간을 현재 시간 +1분으로 설정
        expires.setMinutes(expires.getMinutes()+1);

        res. writeHead(302,{
            location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

        });    //경로 및 위치 / , Expires 유효시간, HttpOnly 쿠키의 접근을 http방식으로만 제한
        res.end();

    }else if( cookies.name ){     // 로그인이 되서 현재 name 세션값이 존재하는 경우
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`)
           
    
    }else{  // 이도저도 아닌경우, 현재 아무도로그인하지 않고 url도 / login이 아닌경우
        try{
            const data = await fs.readFile('./06_Cookie_page.html');
            // res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
            res.end(data);
        }catch(err){
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
    

}).listen(8090, ()=>{
    console.log('8090번 포트에서 서버 대기 중입니다.');
});