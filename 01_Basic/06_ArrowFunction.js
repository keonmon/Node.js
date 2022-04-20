// 06_ArrowFunction.js  - 화살표 함수
// function 함수이름 (매개변수){    } -> 화살표를 이용한 표현방법으로 사용

// 함수의 표현방법 #1
function add1(x, y){
    return x+y;
}
console.log( add1( 10, 20 ) );    // 30


// 함수의 표현방법 #2
let add2 = function (x, y){
    return x+y;
}
console.log( add2( 10, 20 ) );    // 30


//함수의 표현방법 #3-1
//화살표 함수
// function( x, y ) { }
// =>   ( x, y ) => { }

// function(){}
// => ()=>{}

// const add = function(x, y){ }
// const add = (x, y) => { }
const add3 = (x, y) => {
    return x+y;
}
//익명함수 (x, y ) => { return x+y; }가 add3에 저장
console.log( add3(10, 20) );    // 30


//함수의 표현방법 #3-2
const add4 = (x,y) => x+y;
console.log( add4(20, 30) );    // 50
// 함수의 몸체가 단순하게 매개변수들의 연산의 결과들을 return하는 명령만 있을 때 사용.

//함수의 표현방법 #3-3
const add5 = (x, y) => (x+y);
console.log( add5(20, 30) );    // 50

//함수의 표현방법 #3-4
function not1(x){
    return !x;
}
console.log(not1(true));    // false

const not2 = x => !x;
// const not2 = (x) => !x;
console.log( not2(false) );  // true



// 매개변수와 리턴값이 없는 함수
const func1 = () => {
    console.log('매개변수와 리턴값이 없는 함수');
}
func1();    // 매개변수와 리턴값이 없는 함수


//매개변수는 있고 리턴값이 없는 함수
const func2 = (x,y) => {
    console.log(`매개변수(${x}, ${y})있고 리턴값 없는 함수`);
}
func2(10,20);   // 매개변수(10, 20)있고 리턴값 없는 함수


// 매개변수와 리턴값이 있는 함수
const func3 = (x,y) => {
    console.log(`매개변수 (${x}, ${y})와 리턴값이 있는 함수`);
    return x+y;
}
console.log('리턴값 : ' + func3(10, 20));
// 매개변수 (10, 20)와 리턴값이 있는 함수
// 리턴값 : 30


//매개변수가 없고 리턴값이 있는 함수
const func4 = () => {
    console.log(`매개변수가 없고 리턴값이 있는 함수`);
    return 100;
}
console.log('리턴값 : '+func4(10,20));
// 매개변수가 없고 리턴값이 있는 함수
// 리턴값 : 100


//매개변수와 상관없이 단순 리턴값만 있는 함수 : {}가 없는 함수
const func5 = (x,y) => x+y;
// const func5 = (x,y) => (x+y);
console.log(func5(10,50));  // 60


