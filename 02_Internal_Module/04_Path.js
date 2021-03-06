// 04_Path.js

const path = require('path');

// path가 아니어도 사용 가능한 경로와 파일관련 상수
console.log(__filename);    // 현재 사용중인 파일의 이름
// D:\Java\00_JS\02_Internal_Module\04_path.js

console.log(__dirname);     // 현재 파일이 위치한 경로
// D:\Java\00_JS\02_Internal_Module

// 현재 경로와 파일의 이름을 변수에 저장하여 별도 출력
const string = __filename;
console.log( string );	// D:\Java\00_JS\02_Internal_Module\04_path.js

console.log();
console.log('----------------------------------------------')

// path.sep - 경로내부의 폴더들 구분문자
console.log('path.sep : ', path.sep);   // path.sep :  \
// '\' 백슬래시 -> c:\users\java01과 같이 사용한다.

// path.delimiter - 경로와 경로를 구분하는 구분문자
console.log('path.delimiter : ', path.delimiter);   // path.delimiter :  ;
// 경로와 경로를 구분하는 구분문자 - 세미콜론 ' ; '
// '경로1; 경로2; 경로3;' 와 같이 사용

console.log();
console.log('----------------------------------------------------');

// 파일이 위치한 폴더 경로를 보여준다
console.log('path.dirname() : ', path.dirname(string)); // path.dirname() :  D:\Java\00_JS\02_Internal_Module

//파일의 확장자를(.js)를 보여준다.
console.log('path.extname() : ', path.extname(string)); // path.extname() :  .js

// 파일의 이름 + 확장자를 보여준다.
console.log('path.basename() : ', path.basename(string));   //path.basename() :  04_path.js

// 파일의 이름만 보고싶다면, 함수의 두번째 인자로 확장자를 넣어준다.
console.log('path.basename (extname 제외)', path.basename(string, path.extname(string) ));  // path.basename (extname 제외) 04_path

console.log();
console.log('--------------------------------------------------')

// 파일의 경로를 root, dir, base, ext, name으로 분리한다.
console.log('path.parse() : ', path.parse(string));
// path.parse() :  {
// root: 'D:\\',
// dir: 'D:\\Java\\00_JS\\02_Internal_Module',
// base: '04_path.js',
// ext: '.js',
// name: '04_path'
// }

// 파일의 경로와 이름, 확장자를 제공하고, 경로-파일명-확장자로 조합한다.
console.log('path.format() : ', path.format({
    dir : 'D:\\Keonmon\\node_js',
    name : 'javascript_ex1',
    ext: '.js',
}));    // path.format() :  D:\Keonmon\node_js\javascript_ex1.js

// 파일 경로를 사용하던 중 \나 /를 실수로 여러번 쓴 것을 수정한다.
console.log('path.normalize() : ', path.normalize('D:///Keonmon\\\/node_js\\\javascripts_ex1.js') );
// path.normalize() :  D:\Keonmon\node_js\javascripts_ex1.js

console.log();
console.log('--------------------------------------------------------')

// 파일의 경로가 절대경로인지 상대 경로인지 true false로 표시한다.
console.log('path.isAbsolute(C:\\) : ', path.isAbsolute('C:\\'));   // path.isAbsolute(C:\) :  true
console.log('path.isAsolute(./home) : ', path.isAbsolute('./home'));    // path.isAsolute(./home) :  false

// 인수로 나오는 경로와 경로사이에 이동 경로를 표시한다.
console.log('path.relative() : ', path.relative('D:\\JAVA01\\nodejs', 'D:\\')); // path.relative() :  ..\..
// ' ..\.. '  -> 세번 부모폴더로 이동

console.log();
console.log('--------------------------------------------------------')

// 처음 경로부터 이후 나오는 경로로 이동한 폴더를 표시한다.
console.log('첫 인수 경로(__dirname) : ' + __dirname); // D:\Java\00_JS\02_Internal_Module
console.log('path.join() : ', path.join(__dirname, '..', 'Keonmon', '.', '/node_js') ); // path.join() :  D:\Java\00_JS\Keonmon\node_js
// 현재 폴더에서 부모폴더로 이동, Keonmon 폴더로 이동, 현재 폴더에서, node_js 폴더로 표시
// 결과 : D:\Keonmon\Keonmon\node_js
// 이동 경로에 해당 폴더가 없어도 경로이름은 조합되어 결과로 나온다.

console.log();

// resoleve()와 join()은 비슷하지만 '/' 표시를 절대경로 또는 상대경로로 보느냐가 다르다.
// resoleve()는 '/'를 절대경로로 판단하여 최종 결과 경로가 D:\node_js가 된다.
console.log('첫 인수 경로(__dirname) : ' + __dirname); // D:\Java\00_JS\02_Internal_Module
console.log('path.resolve() : ', path.resolve(__dirname, '..', '/Keonmon', '.', '/node_js') );  // path.resolve() :  D:\node_js
// '/Keonmon'에 의해서 D:\Keonmon 되었다가 '/node_js'에 의해서 다시 D:\node_js로 설정된다.