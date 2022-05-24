// 06_readFile.js

// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');

fs.readFile( './readMe.txt', (err, data)=>{
    if(err){    //파일을 읽어오는데 에러가 발생해서 err 변수가 null이 아니라면
        throw err;
    }

    console.log(data);  
    // 버퍼형식으로 출력된다.
    // <Buffer ec 9d b4 20 ea b8 80 ec 9d 84 20 ec 9d bd ec 96 b4 eb b3 b4 ec 9e 90 2e>

    console.log("출력 : " + data.toString());
    // 이 글을 읽어보자.
} );

// # readMe.txt
// 이 글을 읽어보자.

// err : 파일 읽기에 실패했을 때 전달되는 값을 받는 매개 변수
// data : 파일읽기에 성공했을 때 읽어온 파일 내용 데이터