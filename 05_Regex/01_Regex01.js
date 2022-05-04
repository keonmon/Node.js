// 01_Regex01.js 

// 정규 표현식은 문자표현공식, 문자탐색공식이라고 부르는 연산식과 같은 분류언어입니다.
// 전문가가 사용한는 정규표현식은 초보자에게 외계언어와 같은 느낌의 어려운 공식이지만 문자탐색과 스캔에 있어서 강력한 기능을 갖고있어서, 여러 분야에서 많이 사용되고 있습니다.
// 자바스크립트에서도 많은 다양한 정규표현식의 적용을 지원하고 있다.

var a = "While some may view this debt forgiveness as a slap in the face to people who were responsible and paid off their student loans";

// var b = a.match(/a/);   // a 변수 안의 String 내용 중 'a' 글자를 검색 매칭해주세요

// console.log(b);  // '12'(번째에 있다.)

// b = a.match(/th/);   // a 변수 안의 String 내용 중 'th' 글자를 검색 매칭해주세요
// console.log(b); // '20'(번째에 있다.)

// b = a.match(/is/g);   // a 변수 안의 String 내용 중 'th' 글자를 검색 매칭해주세요
// console.log(b); // 'is'하나 나옴

// var a = "gabbvdrfabgrdsagfrea";
// var c = a.match(/ab*/g);   // a변수 안의 String 에서 'a'로 시작하고 'b'가 몇 개든 반복되는 글자를 검색.
// console.log(c);



// << 문자탐색에 사용되는  [ ] >>
// [ ] : 리스트에서 사용했던 대괄호로 표현
// [ ] : 괄호 안에 검색하고자 하는 글자들을 넣고, 그 포함 유무를 판단한다.
// [abc] : a와 b와 c가 대상 문자열 안에 하나라도 포함되었는지 판단한다.
// a : Yes
// before : Yes
// dude : No
// abc 처럼 [ ]가 없는 경우 'abc'단어를 의미하지만
// [abc]는 a 또는 b 또는 c 를 의미한다. 

//[abc]는 'a' 또는 'b' 또는 'c'를 의미한다.
// a = 'a';
// c = a.match(/[abc]/g);
// console.log(c);     // [ 'a' ]

// a = 'before';
// c = a.match(/[abc]/g);
// console.log(c);     // [ 'b' ]

// a = 'dude';
// c = a.match(/[abc]/g);
// console.log(c);     // null

// a = 'before';
// c = a.match(/abc/g);
// console.log(c);     // null

// a = 'grezageagfvrzce';
// c = a.match(/z[abc]/g);
// console.log(c);     // [ 'za', 'zc' ]

// 정규표현식 패턴 끝에 'g'를 쓰면 매칭된 결과를 배열로 하여 모두 찾아내어 담아낸다.
// 'g'가 없으면 맨 첫번째 매칭된 결과를 보여주고, 그 위치값을 index로 보여준다.



// << 자주 사용하는 문자열 패턴 >>
// [0-9] : 숫자와 매치, 0부터 9까지 아라비아 기호 매칭 = [0123456789] 라고 써야하지만 줄여서 사용하는 것이다.
// [a-z] : 문자 소문자와 매치, 소문자 a 부터 z까지의 글자 매칭 = [abcdefghijklmnopqrstuvwxyz]
// [A-Z] : 문자 대문자와 매치, 대문자 A 부터 Z까지의 글자 매칭 = [ABCDEFGHIJKLMNOPQRSTUVWXYZ]
// [a-zA-Z] : 아라비아 숫자를 제외한 대소문자와 매칭
// [a-zA-Z0-9] : 아라비아 숫자, 소문자, 대문자 모두 매칭
// \d : 숫자와 매치 [0-9]와 동일한 표현이다.
// \D : 숫자가 아닌것과 매치 [^0-9]와 동일하다 - ^ : 다음 내용을 제외한 글자
// \s : whitespace(공백)와 매치 [\t\n\r\f\v]와 같은 표현
// \S : whitespace(공백)가 아닌것과 매치 [^\t\n\r\f\v]와 같은 표현
// \w : 문자와 숫자들과 매치 [0-9a-zA-Z]와 같은 표현
// \W : 문자와 숫자가 아닌 것과 매치 [^0-9a-zA-Z]와 같은 표현


// // 소문자 검색
// a = 'ABCDEfGH';
// b = a.match(/[a-z]/g);
// console.log(b);     // [ 'f' ]

// // 숫자 검색
// a = 'ABCDEfGH0';
// // b = a.match(/[0-9]/g);
// b = a.match(/[\d]/g);
// console.log(b);     // [ '0' ]

// // 공백 검색
// a = 'ABCDE fGH';
// b = a.match(/[\s]/g);
// console.log(b);     // [ ' ' ]

// // 글자(문자와 숫자) 검색
// a = '$#%^$!%^k&$%(';
// b = a.match(/[\w]/g);
// console.log(b);     // [ 'k' ]



/*
<< Dot(.) >>
Dot(.) - 줄 바꿈 글자인 '\n'을 제외한 모든 글자와 매칭된다.
a.b : a와 b 사이에 어떤 글자가 들어와도 매칭된다.
a + "모든문자" + b
aab :  Yes
a0b :  Yes
abb :  No
*/

// a = 'aab';
// b = a.match(/a.b/g);
// console.log(b);     // [ 'aab' ]

// a = 'aab';
// b = a.match(/a[.]b/g);
// console.log(b);     // null
// // a.b와 a[.]b의 차이점
// // [.]는 괄호안에 '\n'을 제외한 모든 문자를 표시하는 것이 아닌, 괄호안의 '.'을 찾는 것.
// // 'a.b'는 매칭이 되지만 'aab'는 매칭되지 않는다.

// a = 'a0b';
// b = a.match(/a.b/g);
// console.log(b);     // [ 'a0b' ]

// a = 'a.b';
// b = a.match(/a.b/g);
// console.log(b);     // [ 'a.b' ]

// a = 'ab';
// b = a.match(/a.b/g);
// console.log(b);     // null




/*
 << 반복 '*' 와 '+' >>

 - '*'는 앞에 있는 글자의 반복 횟수를 0회차부터 카운트하여 반복된 문자열을 탐색
 - 정규표현식이 'ca*t'일 경우
 ct : yes
 cat : yes
 caaaaat : yes

 - '+'는 앞에 있는 글자의 반복 횟수를 1회차부터 카운트하여 반복된 문자열 탐색
 - 정규표현식이 'ca+t' 일 경우
 ct : no
 cat : yes
 caaaat : yes

*/

// a = 'caaaat';
// b = a.match(/ca*t/g);
// console.log(b);     // [ 'caaaat' ]

// a = 'caaaat';
// b = a.match(/ca+t/g);
// console.log(b);     // [ 'caaaat' ]

// a = 'ct';
// b = a.match(/ca*t/g);
// console.log(b);     // [ 'ct' ]

// a = 'ct';
// b = a.match(/ca+t/g);
// console.log(b);     // null


/*
반복 {m,n}와 '?'
{m} : 앞에 위치한 글자의 m회 반복 매칭
a{3} : a의 3회 반복
- 정규표현식 : 'ca{2}t'
    cat : no
    caat : yes
{m, n} : 앞에 위치한 글자의 m회부터 n회 반복 매칭
a{2,5} : a의 2~5회 반복
- 정규표현식 : 'a{2,4}t'
    cat : no
    caat : yes
    caaat : yes
    caaaat : yes
    caaaaat : no
? : 앞에 위치한 글자의 0회 또는 1회 반복 매칭
a? : a의 0~1회 반복
- 정규표현식 : 'a?t'
     cat : yes
    caat : yes
    caaat : no

*/

// a = 'caat';
// b = a.match(/ca{2}t/g);
// console.log(b);     // null

// a = 'caaat';
// b = a.match(/ca{2,4}t/g);
// console.log(b);     // null

// a = 'caaaat';
// b = a.match(/ca{2,4}t/g);
// console.log(b);     // null

// a = 'caaaaaat';
// b = a.match(/ca{2,4}t/g);
// console.log(b);     // null

// a = 'ct';
// b = a.match(/ca?t/g);
// console.log(b);     // null



// 연습문제1
// 아래 문자열 중 이름을 제외한 전화번호만 추출하여 출력한다.
a = "park chan ho 010-1234-5678 kim min 010-8888-9999 lee 011-123-2222";
b = a.match( /\d{3,4}-\d{3,4}-\d{3,4}/g);
console.log(b);



// 연습문제2
// 아래 문자열 중 이름을 제외한 이메일주소만 추출하여 출력한다.
a = "park chan ho park@naver.com kim min kim@daum.net lee lee@myhome.com";
b = a.match( /\w*@\w*[.]\w*/g);
console.log(b);



