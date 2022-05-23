// 05_Url.js

const url = require('url');


const { URL } = url;
const myURL = new URL("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require");
console.log('new URL():', myURL);   // url 객체 출력

console.log()
console.log('----------------------------');

// parse() : url을 url객체로 변환하여 리턴한다.
// 인터넷 주소를 parse 함수로 분해하여 각각의 요소를 따로 분리해서 사용할 수 있다.
const parsedUrl = url.parse("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require");
console.log('url.parse():', parsedUrl);
// url.parse(): Url {
//  protocol: 'https:',
//  slashes: true,
//  auth: null,
//  host: 'search.naver.com',
//  port: null,
//  hostname: 'search.naver.com',
//  hash: null,
//  search: '?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require',
//  query: 'where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require',
//  pathname: '/search.naver',
//  path: '/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require',
//  href: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require'
// }

console.log()
console.log('----------------------------');

// format() : url문자열을 리턴
console.log('url.format() : ', url.format(parsedUrl));
// url.format() :  https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require

console.log()
console.log('----------------------------');

 // url객체의 쿼리속성만 출력
console.log("query : " + parsedUrl.query);
// query : where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require