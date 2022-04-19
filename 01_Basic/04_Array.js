// 04_Array.js

//배열
// 다양한 자료를 하나의 범주안에 넣고, 인덱싱(번호)을 이용해 컨트롤 하는 변수
var array = [273, 'string', true, function(){}, {}, [150, 549]];
console.log(array[0]);
console.log(array[1]);
console.log(array[2]);
console.log(array[3]);
console.log(array[4]);
console.log(array[5]);
console.log(array);
console.log('\n');


var arr = ['a', 'b', 'c'];
console.log('변경전 : ' + arr);
arr.push('d');  //배열의 긑에 요소를 추가
console.log('배열의 끝에 요소 추가 : ' + arr);
arr.unshift('A');   //배열의 앞쪽에 요소를 추가
console.log('배열의 앞쪽에 요소 추가 : ' + arr);
arr.splice(2, 0, 'B');  //index 2 ('b')의 위치에 요소를 추가
console.log('index 2 (\'b\')의 위치에 요소를 추가 : ' + arr);
console.log();

arr = ['a','b','c','d'];
console.log('변경전 : ' + arr);
arr.splice(2,0,'C','D');    // index 2 위치에 2개의요소를 추가
console.log('변경 후 (index 2 위치에 2개의요소를 추가) : ' + arr);
console.log('\n');

arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log('변경전 : ' + arr);
// 배열의 첫번째 요소를 제거
var shifted = arr.shift();  // 제거한 요소를 반환받을 수 있음
console.log('변경 후 : ' + arr);
console.log('변경 후(배열의 첫번째 요소를 제거 & 제거한 요소 반환) : ' + shifted);
console.log('\n');



arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log('변경전 : ' + arr);
// index 2부터 한 개의 요소('c')를 제거
arr.splice(2,1);
console.log('변경 후 (\'c\') 를 제거' + arr)

arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log('변경전 : ' + arr);
// index 2부터 한 개의 요소('c')를 제거
arr.splice(2,2);
console.log('변경 후 (\'c\',\'d\') 를 제거' + arr)



