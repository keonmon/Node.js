// 02_Regex02.js

// 메타캐릭터(메타문자) : ^, $, | 등의 문자로 패턴을 표현한 글자들

// // | : or의 의미로 사용.
// // 'a|b'는 'a 또는 b'의 의미

// let a = "Hello World";
// let b = a.match( /Hello|Crow/g);
// console.log(b); //[ 'Hello' ]

// a = "Welcome Crow";
// b = a.match( /Hello|Crow/g);
// console.log(b); //[ 'Crow' ]

// a = "Hello Crow";
// b = a.match( /Hello|Crow/g);
// console.log(b); //[ 'Hello', 'Crow' ]


// // ^ : ^abc 는 abc로 시작하는 의미의 정규식
// // $ : abc$ 는 abc로 끝나는 의미의 정규식

// a = "Life is too short";
// b = a.match(/^Life/g);
// console.log(b); // [ 'Life' ]

// a = "Life is too short";
// b = a.match(/short$/g);
// console.log(b); // [ 'short' ]

// // * \b : Word Boundary 의미로 whitespace로 식별되는 메타 문자
// // * 원래 문자열 안에 사용하는 \b는 백스페이스의 역할을 하는 이스케이프 문자이지만
// // * 정규표현식에서는 공백의 의미로 사용된다.
// a = "no class are all class";
// b = a.match(/\bclass\b/g);
// console.log(b); // [ 'class', 'class' ]

// a = "the declassified algorithm";
// b = a.match(/\bclass\b/g);
// console.log(b); // null

// a = "one subclass is";
// b = a.match(/\bclass\b/g);
// console.log(b); // null

// console.log();
// // \B : whitespace로 구분되지 않는(공백이 아닌 것), 그 외 다른 글자로 구분되는 정규식 
// a = "no class are all class";
// b = a.match(/\Bclass\B/g);
// console.log(b); // null

// a = "the declassified algorithm";
// b = a.match(/\Bclass\B/g);
// console.log(b); // [ 'class' ]

// a = "one subclass is";
// b = a.match(/\Bclass\B/g);
// console.log(b); // null

