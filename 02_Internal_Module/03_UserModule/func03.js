// func03.js

// 구조분해 할당으로 변수 초기화
const{odd, even } = require('./Var');

// require로 얻어온 값을 이용한 함수 제작
function checkOddOrEven(number){
    if(number % 2){
        return odd;
    }else{
        return even;
    }
}

// 모듈을 이용하면, 함수도 exports해서 다른 파일에서 사용이 가능하다.
module.exports = checkOddOrEven;