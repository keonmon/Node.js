// 05_Server05.js

const http = require('http');
const fs = require('fs').promises;

const users = {};   // 서버가 종료될 때까지 없어지지 않고 값이 유지되는 변수.

http.createServer(async (req, res)=>{
    try{
        if(req.method == 'GET'){            // 주로 조회(selelct)용도로 사용
            if(req.url === '/'){    // localhost:8090의 req.method - 'GET' req.url - '/'
                const data = await fs.readFile('./05_Front.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
                // res.end(data) 전송 후 async (req, res)=>{} 함수가 종료
                // 함수 결과를 리턴보다는 함수를 끝낸다는 것이 포인트
            }else if(req.url === '/users'){ // localhost:8090의 req.method - 'GET' req.url - '/users'
    
            }
        }else if(req.method == "POST"){     // 로그인 또는 insert, update
            if(req.url === '/user'){    // localhost:8090의 req.method - 'POST' req.url - '/user'
    
            }
        }else if(req.method == 'PUT'){      // 특정 자료를 수정(update)할 때 
    
        }else if(req.method == 'DELETE'){   // delete 용도로 사용
    
        }
        res.writeHead(404);
        return res.end('NOT FOUND');

    }catch(err){    // 서버 실행상의 에러 - url이 존재하지 않아 생기는 404에러는 처리가 안됨. (위에서 처리해야 함 )
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
        return res.end(err.message);
    }
}).listen(8090, ()=>{
    console.log('8090번 포트에서 서버 대기중입니다.');
});