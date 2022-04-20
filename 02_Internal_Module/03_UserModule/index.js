// index.js

// const {odd, even} = require('./Var');

const checkNumber = require('./func03');
// checkNumber 변수에 func03.js 파일에서 exports한 함수를 require 했습니다.

const result = checkNumber(15);
console.log('15는 ', result);