// 06_readFile.js

// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');

fs.readFile( './readMe.txt', (err, data)=>{
    if(err){    //파일을 읽어오는데 에러가 발생해서 err 변수가 null이 아니라면
        throw err;
    }
    console.log(data);
    console.log(data.toString());
} );

// err : 파일 읽기에 실패했을 때 전달되는 값을 받는 매개 변수
// data : 파일읽기에 성공했을 때 읽어온 파일 내용 데이터