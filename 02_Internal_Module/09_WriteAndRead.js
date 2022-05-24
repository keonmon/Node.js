// 09_WriteAndRead.js

// writeme2.txt에 '안녕하세요. 방갑습니다.'를 쓰고 바로 읽어서 콘솔창에 출력하기.

const fs = require('fs');
const string = '안녕하세요. \n방갑습니다. \n또오세요 \n내일뵐게요!';
fs.writeFile('./writeMe2.txt', string , (err) => {
    if(err){
        throw err;
    }
    
});

fs.readFile('./writeMe2.txt', (err,data)=>{
    if(err){
        throw err;
    }
    console.log(data.toString());
    // 안녕하세요. 
    // 방갑습니다.
    // 또오세요
    // 내일뵐게요!
});