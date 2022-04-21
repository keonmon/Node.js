// 05_Server05.js

const http = require('http');
const fs = require('fs').promises;

let users = {};     // 입력폼에서 등록된 이름들이 담길 객체

// (req, res)=>{ } : 클라이언트로부터 현재 서버로 요청이 들어오면 실행되는 익명함수.
// ()=>{ console.log('8090포트에서 서버가 대기중입니다.') }  : 서버가 처음 실행되어서 대기상태로 갈 때 한번 실행되는 익명함수. (생략될 수 있다)

http.createServer( async (req, res)=>{
    try{
        
        if(req.method=='GET'){      //조회(SELECT)용도로 쓰임

            if(req.url === '/'){
                //fs.readFile('./05_Front.html').then((data)=>{});
                const data = await fs.readFile('./05_Front.html');
                res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
                return res.end(data);   // return은 현재 위치에서 익명함수를 종료하는 것으로 이해하는 것이 편함

            }else if(req.url==='/about'){   
                const data = await fs.readFile('./05_about.html');
                res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
                return res.end(data);

            }else if(req.url ==='/users'){
                // json 데이터 전송을 위한 헤더 설정
                res.writeHead(200, {'Content-type':'application/json; charset=utf-8'});
                //user 객체 안의 내용을 json 형식으로 변경하여 전송
                return res.end( JSON.stringify(users) );
            }

        }else if(req.method=='POST'){   //로그인 또는 INSERT 용도로 쓰임

            if(req.url === '/user'){
                // req에 전송된 자료(name)을 Stream형식으로 받아 body변수에 넣는다.
                let body = '';
                req.on('data', (data)=>{    // {'name' : '홍길동'}
                    console.log('data : ', data.toString());
                    body+=data;
                    console.log('body : ', body);
                });
                // req.on(); : request의 동작을 첫 번째 인수로 전달된 키워드로 구분하여, 같이 전달된 익명함수를 실행한다. 
                // 'data' : 함께 전달된 자료 수신 및 처리
                // 전달된 자료가 두 개 이상이여도 모두객체 형식으로 다 받아 처리한다.

                return req.on('end', ()=>{
                    const {name} = JSON.parse(body);    // 전달된 데이터의 값을 꺼내서 name 변수에 저장
                    const id = Date.now();  // id변수에 날짜를 추출(날짜 현재시간을 밀리초로 얻어낸 값)
                    users[id] = name;   // 키값은 id, 밸류는 name으로 객체에 저장
                    res.writeHead(201, {'Content-Type':'text/plain; charset=utf-8'});
                    res.end('ok');   //원래 자리로 복귀
                });
                // 마지막 전송과 끝내기 위한 리턴.
                // 단순히 req.end()만 실행되는 것이 아닌, 다른 동작이 함께 실행되어야 한다면 아래와 같이 익명함수를 'end'키워드와 함께 실행. 
                // 그 여러 실행들이 실행되고 리턴 & 종료된다.
            }
        }else if(req.method=='PUT'){    //특정 자료를 수정(UPDATE)할 때

            // 요청내용 : axios.put('/user/'+key, {name});
            // console.log(req.url); /user/151232355243
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                let body = '';
                //data <- {name:실제전송된값}
                req.on('data', (data)=>{
                    body += data;
                });
                return req.on('end', ()=>{
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                    return res.end('수정 ok'); 
                });
            }

        }else if(req.method == 'DELETE'){ //DELETE 용도로 사용

            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                return res.end('삭제 ok');
            }
        }
        
        res.writeHead(404);
        return res.end('NOT FOUND');

    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-type':'text/plain; charset=utf-8'});
        res.end(err.message);
    }
} ).listen(8090, ()=>{ console.log('8090포트에서 서버가 대기중입니다.'); });

