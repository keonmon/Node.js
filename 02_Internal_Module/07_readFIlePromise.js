// 07_readFIlePromise.js

// 파일 입출력을 위한 모듈의 promise를 포함하여 로딩한다.
const fs = require('fs').promises;

// 파일 읽기도 에러처리를 위한 함수 없이 실행됩니다.
fs.readFile('./readme.txt') // 이게 실행속도가 비교적 느리니까 나중에 실행됨.
.then( (data)=>{
    console.log(data);
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});
// Promise는 비동기 실행이므로, 아래의 명령이 나중에 실행되도록 뒤에 기술해도, 실행속도가 빠른 명령이 먼저 실행되어 promise결과가 출력된다.
console.log('Promise로 파일을 읽어왔습니다.')