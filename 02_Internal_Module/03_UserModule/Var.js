// Var.js
// 이전에 본 os.js에서 처럼, Node.js에 내장되어 있는 'os' 모듈을 require하여 그 내부의 변수나 함수를 사용할 수 있었다면, 
// 이번에는 '내가 만든 객체를 export' 해두고 '그것을 다른파일에서 require하여 사용'해본다. 

const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports = {
    odd : odd,
    even : even,
};

// 만들어진 객체를 module.exports 에 저장하면 그 객체는 외부로 내보내진다.
// 딱히 어느 파일로 내보낸다라는 방향은 없고,
// exports 되었다라는것 알고 있는 파일에서 require해서 사용한다.
// module이라는 단위로, (var이라는 파일 이름으로) exports된다.