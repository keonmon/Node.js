// 03_Os.js

// 자바에서 임포트해서 쓰던 클래스 -> 자바스크립트에서는 '모듈(Module)'을 require 한다고 표현한다.
// 아래와 같이 기술한다.
const os = require('os');
// 'os모듈의 기능을 담고있는 객체를 불러와, os변수에 (const형 변수)에 저장하고 사용할 것이다.' 라는 뜻

console.log('운영체제 정보 -----------------------------------------------------------');
console.log('os.arch() : ', os.arch());     // 현재 운영체제의 설계 및 운영방식
console.log('os.platform() : ', os.platform()); //운영체제 기반 플랫폼
console.log('os.type() : ', os.type() );        //운영체제 종류
console.log('os.uptime() : ', os.uptime() );    // 운영체제 부팅 후 흐른시간
console.log('os.hostname() : ',os.hostname() ); // 컴퓨터 이름
console.log('os.release() : ', os.release() );  // 운영체제 버전


console.log('경로 -----------------------------------------------------------');
console.log('os.homedir() : ', os.homedir());   // 현재 사용자의 홈디렉토리(폴더)
console.log('os.tmpdir() : ', os.tmpdir());     //현재 사용자의 임시 디렉토리(폴더)


console.log('cpu 정보 -----------------------------------------------------');
console.log('os.cpus() : ', os.cpus());             //cpu정보
console.log('os.cpus().length : ', os.cpus().length);    // cpu 코어 개수


console.log('메모리 정보 -----------------------------------------------------');
console.log('os.freemem() : ', os.freemem());   // 사용 가능 메모리
console.log('os.totalmem() : ', os.totalmem()); // 전체 메모리

