// 11_readFileAsync.js

const fs = require('fs');
/*
console.log("시작");    // 시작
fs.readFile('./readMe1.txt', (err, data)=>{
    if(err){ throw err; }
    console.log('1번', data.toString());    // 1번 저는 readMe1입니다.
});

fs.readFile('./readMe2.txt', (err, data)=>{
    if(err){ throw err; }
    console.log('2번', data.toString());    // 2번 저는 readMe2입니다.
});

fs.readFile('./readMe3.txt', (err, data)=>{
    if(err){ throw err; }
    console.log('3번', data.toString());    // 3번 저는 readMe3입니다.
});
console.log("끝");  // 끝


console.log("시작");    // 시작
fs.readFile('./readMe1.txt', (err, data)=>{
    if(err){throw err; }
    console.log('1번', data.toString());    // 1번 저는 readMe1입니다.
    
    fs.readFile('./readMe2.txt', (err, data)=>{
        if(err){ throw err; }
        console.log('2번', data.toString());    // 2번 저는 readMe2입니다.
        
        fs.readFile('./readMe3.txt', (err, data)=>{
            if(err){ throw err; }
            console.log('3번', data.toString());    // 3번 저는 readMe3입니다.
            console.log("끝");  // 끝
        });
    });
})
*/

console.log("시작");    // 시작
let readMeFile = fs.readFileSync('./readMe1.txt')
    console.log('1번', readMeFile.toString());    // 1번 저는 readMe1입니다.

readMeFile = fs.readFileSync('./readMe2.txt')
    console.log('2번', readMeFile.toString());    // 2번 저는 readMe2입니다.

readMeFile = fs.readFileSync('./readMe3.txt')
    console.log('3번', readMeFile.toString());    // 3번 저는 readMe3입니다.

console.log("끝");  // 끝