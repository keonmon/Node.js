// 06_Session_Server.js

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const { kill } = require('process');

const parseCookies=(cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc,[k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};
http.createServer( async (req, res) => {

    const cookies = parseCookies(req.headers.cookie);

    if( req.url.startsWith('/login') ){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);

        // 세션, 쿠키의 수명 계산
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);

        //세션의 키값
        const uniqueInt = Date.now();   // 세션 객체에 저장하기 위한 고유 키값

        // Cookies - name = ${uniqueInt}
        // Session - ${uniqueInt} : '홍길동'
        // 세션의 값들은 서버에서 관리하되, 세션에 해당 값이 있는지 없는지, 쿠키값이 있는지 없는지를 검사해서 조회.

        session[uniqueInt] = {
            name,   // name:name
            expires,// expires
        };
        res. writeHead(302,{
            location: '/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

        });

        res.end();

    } else if( cookies.session && session[cookies.session].expires > new Date() ){
        // 쿠키에 session이라는 값이 존재하고, 수명이 다하지 않았다면
        res.writeHead(200,{'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        try{
            const data = await fs.readFile('./06_Cookie_page.html');
            res.end(data);

        }catch(err){
            res.writeHead(500,{'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }

    }

}).listen(8090, () => {
    console.log('8090 포트에서 서버 대기중입니다.');
});