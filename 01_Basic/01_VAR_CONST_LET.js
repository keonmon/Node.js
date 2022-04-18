// 변수선언
// 자바스크립트의 버전에 따라 사용하는 변수선언이 많이 달라지고 있다.
// 브라우저를 대상으로 하는 ES2015버전 이전에는 var로 변수선언이 많이 되었지만 이후부터 const 또는 let 변수를 많이 사용한다.

var x = 3;
console.log(x);
x = '홍길동';
console.log(x);


// 상수형 변수 선언 const
// 변수 생성과 함께 반드시 초기값이 있어야 하며, 이후 저장된 값의 변경이 불가능하다.
const y = 3;
console.log(y);
//y = '홍길동' //에러 - const 변수는 최소 1회만 값을 할당할 수 있다.

//------------------------------------------------------------------


//var과 const의 차이점
// - 블록스코프 : var변수는 ({}, 지역변수)와 상관없이 값에 접근이 가능하다.
if(true){
    var a =3;
}
console.log(a);
// 다만 함수의 시작과 끝을 구분짓는 중괄호({, })는 영향을 받아서 함수를 벗어나면 변수로 인식되지 못한다.


//반면 const 변수(상수)는 블록영역에 영향을 받아 접근이 구분된다.
if(true){
    const b =3;
}
//console.log(b); //에러 발생


//const 변수는 상수형 변수라고 부른다.
// 한번 할당된 값은 변경할 수 없으며, 상수 선언 초기화가 없어도 에러가 발생한다.
const a1 = 0;
//a1 = 1;   //에러
//const c; //에러 : 초기화되지 않은 상수형 변수


// 값을 변경할 수 있는 변수를 사용하려면, 앞에서 사용한 var변수나, 서버프로그래밍에서 주로 사용하는 let 변수를 사용한다.
// var과 let변수의 차이는 다소 많지는 않으며, 명백히 다른 점이 있지만 현재 사용상 구분할 일이 그렇게 많지 않다.
// 버전업과 제작자 사이에서 있을 수 있는 차이와 그의 차이점을 아래에 설명한다.
let b1 = 0;
b1 = 1; //정상 실행됨.


// <<const, let, var의 차이점>>
// 자바스크립트 변수 생성은 '선언', '할당(초기값 대입)', '사용'의 단계로 구분된다.
// const와 let은 그 사용영역이 구분되어 사용해야 하지만, var은 그 구분이 비교적 자유로운 편.
// const와 let변수는 반드시 선언 후 사용해야 하며,      var은 선언 없이 사용가능하다.
// 따라서 선언과 할당없이 사용된 변수는 모두 'var변수'이다.
// 선언과 할당없이 사용된 var변수의 최초값은 'undefined'이다.


// 1. const
// - 선언과 함께 초기화되며, 새로운 값으로 재할당 되지 못하는 변수
// - 변수 선언 후 반드시 초기값이 할당되어야 한다.
// - 스코프 안에서 같은 이름의 변수를 중복선언시 에러를 발생시킨다.
// - 중괄호 영역(스코프)에 영향을 받아 스코프를 벗어나면 변수가 인식되지 못한다.
// - 에러내용 ( 변수이름 is not defined )
if(true){
    const a = 123;
    //const a = 123;    //에러
}
// console.log(a);  //에러


// 2. let
// - 재할당이 가능한 변수.
// - const와 같이 반드시 선언 후 사용해야 한다.
// - 스코프 안에서 같은 이름의 변수를 중복선언할 경우 에러를 발생시킨다.
let b = 456;
//let b = 789; //에러발생

// - 초기값 할당 없이 선언된 변수의 최초값은 undefined이다
// - 중괄호 영역(스코프)에 영향을 받아스코프를 벗어나면 변수가 인식되지 못한다.
// - 에러내용 ( 변수이름 is not defined)
if(true){
    let c = 123;
}
//console.log(c);



// 3. var
// - 선언, 할당, 사용이 위치와 상관없이 자유롭다.
// - 스코프에 상관없이 값의 접근이 가능하다.
// - 같은 스코프 안에서 중복선언도 가능. 이때 마지막에 대입된 값을 현재값으로 인식한다.
var i = 10;
var i = 20;
// - 이와 같은 특성으로 구조가 복잡한 함수내에서는 현재값을 유추하는데 다소 불편함이 있다.
// - 값의 변경이 자유로워서 의도한 값의 저장 및 유지가 실패할 가능성이 있다.
// - 함수의 영역을 벗어나는 스코프에만 영향을 받는다.

// 변수 선언과 선언키워드 별 사용의 방향
// 1. 변수 선언에는 기본적으로 const를 사용하고, 재할당이 필요한 경우에 한해 let을 사용하는것을 권장한다.
//      - 객체를 재할당하는 경우는 생각보다 흔하지 않으므로, 객체 변수 또한 const를 사용하는것을 권장.
//      -  const를 사용하면 의도치 않은 재할당을 방지해 주기 때문에 데이터의안전을 보장받을 수 있다.
// 2. 재할당이 필요한 경우에 한정해 let을 사용한다. 이때, 변수의 스코프(영역)은 최대한 좁게 만드는 것을 권장.
//      - 재할당이 필요없는 상수와 객체에만 const를 사용한다.
