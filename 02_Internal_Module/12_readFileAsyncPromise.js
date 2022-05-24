// 12_readFileAsyncPromise.js

const fs = require("fs").promises;

console.log("시작");    // 시작
fs.readFile('./readMe1.txt')
.then((data)=>{
    console.log('1번', data.toString()) // 1번 저는 readMe1입니다.
    return fs.readFile('./readMe2.txt')
})
.then((data)=>{
    console.log('2번', data.toString()) // 2번 저는 readMe2입니다.
    return fs.readFile('./readMe3.txt')
})
.then((data)=>{
    console.log('3번', data.toString()) // 3번 저는 readMe3입니다.
    console.log("끝");  // 끝
})
.catch((err)=>{
    console.error(err);
});