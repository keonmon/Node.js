// 03_Object.js

// 1. 자바 스크립트의 '객체' 생성
// { } 중괄호 안에 key(요소'의 이름)와 value(요소의 값)이 ':'(콜론)으로 구분되어서 존재하는 값들의 집합.
const product = {name:'냉장고', 제조사:'대한민국'};
// 변수하나 안에 한 개 이상의 키와 값이 조합되어 데이터를 넣어 사용한다.
// 객체안에 있는 키와 값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분한다.

// 객체내의 키를 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

const product2 = {};
console.log(product2);

// 자바스크립트의 객체는 별도의 클래스 선업없이, { }중괄호 안에 직접 속성들을 넣는 순간 '객체(Object)로 인식'되어 사용되어진다.


// 2. 객체의 속성과 메서드
// - 속성 : 객체 내부에 있는 하나 하나의 값.
// - 객체의 속성이 가질 수 있는 자료형.
var object = {
    useNumber:273,
    useString:'문자열',
    useBoolean:'true',
    useArray:[52, 385, 103, 58],
    //메서드 : 객체의 속성 중 함수 자료형인 속성.
    method:function(){
        console.log('멤버 함수를 실행합니다.');
    }
};
object.method();                // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행.
console.log(object.method);     //[Function:method]출력
console.log(object.method());   // 함수의 내부에 있는 console.log('멤버함수를 실행합니다.'); '멤버 함수를 실행합니다.'를 출력.
                                // 그리고 console.log(object.method());의 console.log()는 undefined출력
console.log(object.useNumber);
console.log(object.useArray);


//멤버 함수에 매개변수가 존재할 수 있다.
var person={
    name:'홍길동',
    eat:function(food){
        console.log('음식: ' + food);
    }
};
console.log(person.name);
person.eat('스파게티');


//멤버 함수가 멤버변수로의 접근
// - this 키워드 : 자바스클비트는 멤버 변수에 접근을 위해서 반드시 this 키워드를 써야한다.
var person = {
    name:'홍길동',
    eat:function(food){
        console.log( this.name + '이/가 ' + food + '을/를 먹었습니다.');
        console.log(`'${this.name}'이/가 '${food}'을/를 먹었습니다.`);
    }
};
person.eat('김밥');



// 3. 객체와 반복문
var product3 = {
    name:'Eclipse & Tomcat',
    price:'Free',
    language:'한국어',
    supportOS:'win32/64',
    subscripton:true
};
//객체 이름을 반복문에 대입하여 각 멤버 변수들의 값에 접근한다ㅏ.
for(var key in product3){
    var output = `${key} : ${product3[key]}`;
    console.log(output);
}