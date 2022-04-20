// 05_Url.js

const url = require('url');

const { URL } = url;
const myURL = new URL ("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require");
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));

console.log('----------------------------');
const parsedUrl = url.parse("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=require");
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
// 인터넷 주소를 parse 함수로 분해하여 각각의 요소를 따로 분리해서 사용할 수 있다.
console.log(parsedUrl.query);   // 파싱된 주소에서 쿼리만 분리하여 출력