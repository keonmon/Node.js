// 03_Object.js

// 1. 자바 스크립트의 '객체' 생성
// { } 중괄호 안에 key(요소의 이름)와 value(요소의 값)이 ':'(콜론)으로 구분되어서 존재하는 값들의 집합.

const product = {
    name:'냉장고', 
    제조사:'대한민국'
};
// 변수하나 안에 한 개 이상의 키와 값이 조합되어 데이터를 넣어 사용한다.
// 객체안에 있는 키와 값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분한다.

// 객체내의 키를 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

const product2 = {};
console.log(product2);

// 자바스크립트의 객체는 별도의 클래스 선언없이, { }중괄호 안에 직접 속성들을 넣는 순간 '객체(Object)로 인식'되어 사용되어진다.


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
object.method();                // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행.  // 멤버 함수를 실행합니다.
console.log(object.method);     // [Function:method]출력
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


// 멤버 함수가 멤버변수로의 접근
// - this 키워드 : 자바스크립틐는 멤버 변수에 접근을 위해서 반드시 this 키워드를 써야한다.
var person = {
    name:'홍길동',
    eat:function(food){
        console.log( this.name + '이/가 ' + food + '을/를 먹었습니다.');
        console.log(`'${this.name}'이/가 '${food}'을/를 먹었습니다.`);      // template literals
    }
};
person.eat('김밥');


console.log();
// 3. 객체와 반복문
var product3 = {
    name:'Eclipse & Tomcat',
    price:'Free',
    language:'한국어',
    supportOS:'win32/64',
    subscripton:true
};
console.log(product3.name);
// 객체명을 반복문에 대입하여 각 멤버 변수들의 값에 접근한다.
for(var key in product3){
    var output = `${key} : ${product3[key]}`;
    console.log(output);
}   // product3 객체에 있는 모든 멤버 변수명을 key라는 변수에 저장하면서 반복실행(멤버변수 개수만큼)
// product[key] key값을 이용해 멤버변수 값들에 접근 -> 출력


console.log();
// 4. 객체와 관련된 키워드
var student = {
    이름:'홍길동',
    국어:92,
    수학:98,
    영어:96,
    과학:98
};
// - in : 해당 키(멤버변수)가 객체 안에 있는지 확인
console.log('이름' in student);
console.log('성별' in student);


console.log()
// - with : 복잡하게 사용해야 하는 코드를 짧게 줄여주는 키워드

// . with 키워드를 사용하지 않은 경우
var student={
    이름:'홍길동',
    국어:92, 수학:98, 영어:96, 과학:98
};
var write = '';
write += '이름 : ' + student.이름 + '\n';
write += '국어 : ' + student.국어 + '\n';
write += '수학 : ' + student.수학 + '\n';
write += '영어 : ' + student.영어 + '\n';
write += '과학 : ' + student.과학 + '\n';
console.log(write);

// . with 키워드를 사용한 경우
var write = '';
with(student){
    write += '이름 : ' + 이름 + '\n';
    write += '국어 : ' + 국어 + '\n';
    write += '수학 : ' + 수학 + '\n';
    write += '영어 : ' + 영어 + '\n';
    write += '과학 : ' + 과학 + '\n';
};
console.log(write);


console.log();
// 5. 객체의 속성 추가와 제거
// - 동적 속성 추가/제거 : 처음 객체 생성하는 시점 이후에 객체 속성을 추가하거나 제거할 수 있다.

//빈 객체를 생성
var student = {};

// 객체 생성 이후 동적으로 속성(멤버변수)를 추가할 수 있다.
student.이름 = '홍길동';
student.취미 = '악기';
student.특기 = '프로그래밍';
student.장래희망 = '훌륭한 프로그래머';

for(var key in student){
    console.log(`${key} : ${student[key]}`);
}

console.log();

// 객체 안에 변수로 함수를 선언하는 경우
// var student = {이름 : '홍길동',
// toString:function(){ }};

// 동적으로 메서드 추가
student.toString = function(){
    for(var key in this){       //자신의 객체를 for문에 적용
        if(key != 'toString'){  // 메서드 toString이 아니라면 다른 멤버 변수의 값을 출력한다.
            console.log(`${key} : ${student[key]}`);
        }
    }
}
student.toString();


console.log();
//객체의 속성 제거 
delete(student.장래희망);
student.toString();
console.log('\n');


console.log();
// 6. 생성자 함수 : new 키워드를 사용해 객체를 생성할 수 있는 함수.
// - 생성자 함수를 사용한 객체의 생성과 출력. 일반 함수를 사용해 객체를 리턴하는 방법과 차이가 없어보인다.

var student1 = {이름 : '홍길동'};
var student2 = {이름 : '홍길동', 성별:'남'};
var student3 = {이름 : '홍길동', 성별:'남', 나이:20};
// 위 세 객체는 모두 형태가 다른 '객체'이다.

// 함수 안에 this를 이용한 변수에 값을 넣으면 그 이름의 멤버변수가 만들어지고, 최종 그 변수들을 멤버로 하는 객체가 만들어지는 '생성자 함수'로 인식된다.
function Student(name, korean, math, english, science){
    //속성
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    //메서드
    this.getSum = function(){
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function(){
        return this.getSum()/4;
    }
    this.toString = function() {
        return '이름 : ' + this.name + ',  총점 : ' + this.getSum() + ',  평균 : ' + this.getAvg();
    }
}       // 객체가 만들어지기 위한 '생성자 함수'

var std1 = new Student('홍길동', 88,78,98,87);
var std2 = new Student('홍길남', 77,65,89,65);
var std3 = new Student('홍길서', 99,74,95,78);

console.log( std1.toString() );
console.log( std2.toString() );
console.log( std3.toString() );



console.log();
// 7. 프로토타입
// - 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간.
// - 자바스크립트의 모든 생성자 함수는 내부의 this 변수들의 prototype을 가진다.
// - 그리고 prototype은 객체이다.

function Student(name, korean, math, english, science){
    //속성
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
}

// 생성자 함수가 만들어지고, 그 안에 this를 이용한 멤버변수가 정의, 초기화되면
// 그 함수로 만들어질 객체를 위한 '프로토타입'이라고 하는 객체가 생성된다.
// 프로토타입은 생성될 객체의 원본이며, 프로토타입 또한 '객체로 존재'한다.

var std1 = new Student('홍길북', 89,43,65,83); 
// 위 명령이 실행되는 순간 -> 프로토타입의 사본객체가 std1에 저장되며 새로운 객체를 이룬다.

// 만약 생성자함수에 추가로 멤버변수 또한 멤버메서드를 추가하려고 한다면,
Student.prototype.basicLanguage = 100;
Student.prototype.getSum = function(){
    return this.kor + this.math + this.english + this.science + this.basicLanguage;
}
Student.prototype.getAvg = function(){
    return this.getSum() / 5;

}
Student.prototype.toString = function(){
    return '이름 : ' + this.name + ',  총점 : ' + this.getSum() + ',  평균 : ' + this.getAvg() + ',   basicLanguage : ' + this.basicLanguage;

}

console.log();
// 새로 추가된 멤버변수 basicLanguage 변수의 값을 전달인수로 전달해서 초기화할 수는 없다.
std1 = new Student('홍길서', 95,43,75,43);  // basicLanguage의 값은 100이다.
console.log(std1.toString());
// 프로토타입은 생성자 안에서 새로 만들어지는 객체에 복사되기 위해 준비되고 있는 공간
// 그 안에 새로 만들어질 객체의 모습을 갖춘 객체이다.
// 생성자에 멤버 변수와 멤버 메서드를 추가하려면 반드시 이 프로토타입을 이용하면 된다.


//객체를 생성후에 멤버메서드를 추가하느냐, 프로토타입에 메서드 추가 후 객체를 만드느냐는 선택적으로 사용할 수 있다.
// (1). 객체를 먼저 만들고, 그 객체에 toString 멤버 메서드 추가
var std1 = new Student('홍길동', 88,85,53,22);
std1.toString = function(){  }
console.log(std1);
// 결과 : 현재 객체에만 toString 추가


// (2).생성자에 toString 추가하고 객체 생성
Student.prototype.toString = function(){  }
var std1 = new Student('홍길동', 88,85,53,22);
console.log(std1);
console.log(Student.prototype);
// 결과 : 앞으로 Stduent 생성자를 이용해서 만들어지는 모든 객체에 toString이 추가된다. 
// (직접적으로 보이지는 않지만 함수를 사용할 수 있다.)

console.log(std1.toString());


console.log();
// 9. 상속
function Rectangle(w, h){
    var width = w;
    var height = h;
    this.getWidth = function() { return width; }
    this.getHeight = function() { return height; }
    this.setWidth = function(value) { width = value; }
    this.setHeight = function(value) { height = value; }
}

// 넓이를 구하는 getArea()를 프로토타입(유전자)에 생성
Rectangle.prototype.getArea = function(){
    return this.getWidth() * this.getHeight();
}

var rectangle = new Rectangle(5,7);     // 객체 생성
rectangle.setWidth(8);  // width 5 -> 8
console.log('AREA : ' + rectangle.getArea());
console.log('\n');


//Rectangle 생성자를 상속
function Square(length){
    this.base = Rectangle;  // base속성에 부모 생성자를 담는다.
    // 전달된 length 값을 base 생성자의 w,h에 같은 값으로 전달
    this.base(length, length);
}

// 추가로 프로토타입도 복사한다.
Square.prototype = Rectangle.prototype;

// 부모생성자로 객체 생성
var rectangle = new Rectangle(5,7);
// 자식 생성자로 객체 생성
var square = new Square(5);

//상속받은 메서드 실행
console.log('rectangle AREA : ' + rectangle.getArea())
console.log('square AREA : ' + square.getArea())



// 10. Object 객체
// - toString() 메서드.
// - 객체를 문자열로 변환할 때 자동으로 호출
var obj = new Object();

console.log(obj);               // {}
console.log(obj.toString());    // [object Object]

// - toString() 메서드 재정의
var student = {
    name:'홍길동',
    grade:'고등학교 1학년',
    toString:function(){ return this.name + ':' + this.grade;}
};

console.log(student);               // Object객체가 갖고있는 toString이 모든 멤버를 출력
console.log(student.toString());    // 재정의된 toString이 함수안의 내용을 리턴 또는 실행