// 01_Console.js

const string = 'abc';
const number = 1;
const boolean = true;
const obj={
    outside : {
        inside: {
            key : 'value',
        },
    },
};

//console.log()
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있다.');
console.log(string, number, boolean);
console.log();

// 같은 텍스트여도 에러 메시지는 console.error()에 담아 출력한다.
console.error("에러 메시지는 console.error에 담아주세요");
console.log();


// console.table() 안의 객체 모양의 데이터들을 테이블형태로 출력한다.
console.table( [ {name:'제로', birth:1994}, {name:'hero', birth:1988} ] );
//같은 키들을 갖고있는 다시의 객체를 행과 열로 정렬해 출력한다.
console.log();


// console.dir(): 객체 내의 또 다른 객체등을 표현할 때 많이 사용된다.
console.dir(obj, {colors:true, depth:2});
console.dir(obj, {colors:true, depth:1});
// colors : 자료 표현 색 지정 유무, depth:표현하고자 하는 깊이
console.log();


// console.time 부터 console.timeEnd 까지 걸린 시간을 출력한다.
// 입력 인자값이 같은 곳에 한하여 시작과 끝으로 작용한다.
console.time('시간측정');
for(let i = 0; i < 100000; i++){}
console.timeEnd('시간측정');
console.log();



// 에러추적
function b(){
    console.trace('에러 위치 추적');
}
function a(){
    b();
}
a();