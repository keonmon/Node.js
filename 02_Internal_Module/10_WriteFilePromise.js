// 10_WriteFilePromise.js

const fs = require('fs').promises;

fs.writeFile('./writeMe3.txt', '안녕하세요. \n방갑습니다')
.then(()=>{
    return fs.readFile('./writeMe3.txt');   // 파일을 읽어오는 프라미스를 리턴
})
.then((data)=>{
    console.log(data.toString());
    // 안녕하세요.
    // 방갑습니다
})
.catch((err)=>{
    console.error(err);
});