// 05_ObjectArray.js

// 생성자 함수로 배열의 요소 추가

function Student(name, korean, math, english, science){
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    this.getSum = function(){
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function(){
        return this.getSum() / 4;
    }
    this.toString = function(){
        return this.name +' : ' + this.getSum() + ', ' + this.getAvg();
    }
}

let students = [];   // 비어있는 배열을 생성
let obj1 = new Student('홍길동', 80,65,53,52);  //Student 객체를 생성
students.push(obj1);        // student 배열에 obj1 객체를 추가

obj1 = new Student('홍길서', 64,33,64,74);
students.push(obj1);

students.push(new Student('홍길남',75,43,64,65));
students.push(new Student('홍길북',66,23,53,32));
students.push(new Student('홍길덩',55,41,64,54));
students.push(new Student('홍길냄',43,43,64,65));
students.push(new Student('홍길뷱',61,34,42,64));

// 배열이 for문에 사용되면 객체처럼 멤버변수들이 아니라
// 인덱스 값들이 i에 전달되어 반복실행이 진행된다.
for(var i in students){
    console.log(students[i].toString() );
}
console.log();


//객체에 문자열 연산과 함수와 변수를 활용
let sayNode = function(){
    console.log('Node');
};

let myName = 'NodeJs';
let oldObject = {
    //myNAme : 'NodeJs',
    //myName : myName,    //첫번째 myName : 멤버변수, 두번째 myName : 일반변수
    // 위 처럼 멤버변수와 대입될 값을 저장하고 있는 일반변수의 이름이 같다면, 아래와 같이 한번만 써서 표현할 수 있다.
    myName,

    sayJS:function(){
        console.log('JS');
    },
    //sayNode:function(){
    //    console.log('Node');
    //}
    //sayNode:sayNode,
    sayNode,    
    // 키(멤버변수)이름과 Value변수명이 같으면 한번만 써도 된다. 
};
console.log(oldObject.myName);
oldObject.sayNode();
oldObject.sayJS();



console.log();
let es = 'ES';
oldObject[es + '6'] = 'Fantastic';
//  'ES6' 이라는 멤버변수 생성. 문자열 연산에 의해 변수이름을 조합한 예
console.log(oldObject.ES6);

//const 변수로 객체 생성
const newObject = {
    myName,
    sayJS: function() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};
console.log(newObject.myName);  //myName
newObject.sayNode();     //Node
newObject.sayJS();   //JS
console.log(newObject.ES6);  //Fantastic



console.log();
// 객체의 구조분해
// : 객체 내부의 멤버변수 또는 멤버메서드를 별도의 변수에 따로 저장하여 별도로 사용하기위한 문법

const sayJ = newObject.sayJS;   // 객체내의 함수를 별도의 변수에 저장
sayJ();
const sayN = newObject.sayNode;
sayN();

var es6 = newObject.ES6;
console.log(newObject.ES6);
console.log(es6);


console.log();
// 객체의 구조분해를 하지 말아야 하는 경우 - this를 사용하는 객체는 구조분해를 하지 않는것이 좋다.
const candyMachine={
    status:{
        name:'node',
        count:5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    },
};
console.log(candyMachine.getCandy());   // 4
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
// getCandy();  //에러 - 
console.log(count);                     // 4
// 객체내의 메서드가 구조분해되는 순간, 안에있던 this를 사용할 수 없게 되므로 그 안의 count또한 없는 변수가 되어버린다.

//객체의 구조분해를 한번에 실행
const newObject1 = {
    myName1 : 'NODE.JS',
    [es + 2] : 'Fantastic',
    sayJS : function(){ console.log('JS');},
    sayNo : function(){ console.log('NODE')},
};

// 객체의 구조분해를 한번에 실행
const {myName1, ES2, sayJS, sayNo} = newObject1;
//객체 안의 변수이름을 그대로 사용하는것이 보통이다.
console.log(myName1);   // NODE.JS
console.log(ES2);       // Fantastic
sayJS();                // JS
sayNo();                // NODE


//const { getCandy, status:{count} } = candyMachine;
// console.log(getCandy()); //에러
//위와같이 한번에 구조분해를 하기 위해선 중괄호{}안의 변수이름을 맞춰서 분해한다.
// 분해하지 않으려고 하는 멤버는 중괄호안에 스지 않아서 분해에서 제외할 수 있다.

// 이는 아래와 같이 배열에 여러 자료를 넣어놓고 인덱스를 이요하여 따로따로 추출하는 것과 한번에추출하는 모양과 같은 형식으로 사용한다.
// 하나의 변수에 하나씩 추출
let array1 = ['nodejs', {}, 10, true];
let node1 = array1[0];
let obj3 = array1[1];
let bool1 = array1[3];
console.log(node1, obj3, bool1);
console.log();

// 한번에 추출
const array2 = ['nodejs', {}, 20, false];
const [node2, obj2, , bool2] = array2;
console.log(node2, obj2, bool2);