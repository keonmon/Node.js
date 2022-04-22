
const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT||3000);

// app.get() 또는 app.post 등... 리퀘스트로 키워드를 받아 해당 요청에 응답을 보내주는 메서드들을 '라우터'라고 부른다.
// 첫 번째 매개변수 전달요소별로 리퀘스트 키워드를 요청받아 익명함수를 실행해서 응답한다. 그 메서드 안에 들어가는 익명함수들 ()=>{}을 '미들웨어'라고 부른다

//  app.get('(url)', ... );  -> 라우터
// (req, res) => {    res.sendFile(path.join(__dirname, '/index.html'));   }  -> 미들웨어


// 미들웨어만을 위한 멤버함수(라우터)가 존재한다.
// 1. 모든 라우터들이 실행되기 전 실행되는 라우터 : 보통 다른 라우터들의 위쪽에 기술되어져서 모든 라우터들이 실행되기 전 실행의 대상으로 인식왼다.

app.use( (req, res, next)=>{
    console.log('모든 요청에 실행하고 싶어요');
    next();
    // 모든 라우터에 next가 있지만 사용하지 않아서 생략된 상태.
    // 필요하면 꺼내어 사용할 수 있다.
    // next()가 없으면 현재 라우터에서 요청에 대한 응답이 종료되니, 미들웨어를 위한 라우터는 반드시 next()를 사용한다.
});

//-------------------------------------------------------

// 2. 특정 리퀘스트에서만 실행할 미들웨어
app.use('/about', (req, res, next)=>{
    console.log('about 요청에만 실행되는 미들웨어입니다.');
    next();
})
//get과 post등 모든 method에서 리퀘스트 키워드만 같으면 실행된다.
// 실행 후 next()로 인해 제어권이 아래로 이동하여, 해당 get이나 post등이 추가 실행된다.
// ---
app.get('/about', (req, res)=>{
    res.send('<h2>Hello About</h2>');
});

// ----------------------------------
// 4.1 에러발생
app.use((req, res, next)=>{
    //throw new Error("서버 - 에러를 발생시켜주마~~");
    // 파일 하단에 4.2. 에러처리 라우터가 없으면 브라우저에 에러내역이 표시되어 모든 서버 구조가 노출된다. (500에러)
    // 에러내역은 서버의 콘솔에만 나오고 브라우저에는 에러처리에 의한 애ㅛㅇ만 나오도록 "에러처리 라우터"를 마지막에 추가해준다.
   
    /*
     // 5. 에러 처리의 또 다른 형태
     try{
        console.log(정의안된변수사용);
    } catch(error){
        next(error);    // 에러처리 미들웨어로 이동하라는 next
        // next에 error가 인수로 들어가면 에러처리 라우터로 이동한다.
        // error말고 'router'가 인수라면 다음 미들웨어로 이동하라는 뜻.
    }   
    */
    next();
});





app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/abc', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index1.html'));
});


// 7. 리퀘스트 키워드의 와일드카드 문자.
app.get('/category/Boots', (req, res)=>{
    res.send('<h2>Hello Boots</h2>');
});
app.get('/category/Heel', (req, res)=>{
    res.send('<h2>Hello Heel</h2>');
});
//와일드카드 키워드를 사용한 라우터는 범위가 넓으므로 가능한 아래쪽에 위치시켜서, 명확한 구분은 먼저 실행되게 하고,
// 해당 라우터가 없을 때 실행되게 하는것이 효과적이다.
app.get('/category/:name', (req, res)=>{
    res.send(`<h2>Hello wild Card Char ${req.params.name}</h2>`);
})




// 6. 404에러 처리
app.use((req,res,next)=>{
    res.send('비정상적 접근~ 에러입니다~');
    // res.status(404).send('404 에러임!');     //400에러와 500에러는 위험하기 때문에 브라우저에 노출시키지 않는편이 좋다.
})


//4.2. 에러처리 라우터 --------
// 위 라우터 또는 미들웨어에서 에러가 발생했을 때 실행되는 미들웨어.
// 에러처리 라우터에 있는 미들웨어는 반드시 매개변수가 err, req, res, next 네개가 쓰여져야 에러처리로 인식된다.
// 넷 중에 하나만 빠져도 에러처리 라우터로 인식되지 못한다.
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(200).send('에러내용을 브라우저에 알려주지 않을래');
   
});



app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기중입니다.');
})


// 8. 미들웨어의 특성
// 하나는 미들웨어에서 res.send() 또는 res.sendFile()등을 두 번이상 쓸 수 없다. res.json()도 예외는 아니다.
// http서버에서 사용하던 res.writeHeader() + res.end()가 합쳐져서 res.send()가 된 것이므로 위 send는 두번이상 쓰는 것은 의도치 않은 에러를 발생한다.
// res.json()또한
// res.writeHeader(200, {'Content-Type' : application/json'});
// res.end(FJSON.stringify({hello:'hong'}));
// 위 둘이 합쳐져서
// res.json({hello:'hong'});로 사용된다.
// 역시 다른 메서드도 함께 두번이상 사용되지 않는다.


// 9. Express서버의 다른서버와의 특징
// http 모듈 웹서버의 확장판으로 코드 가독성이 좋고 확장성이 뛰어나다.
// 프레임이 잡혀있어 파일관리 및 운영이 용이하다.
// 비슷한 서버로서 Koa, Hapi 드이 있지만 Express서버를 가장 많이 사용한다.
// 코드관리 및 편의성에서 많은 장점을 제공한다.

// 10. package.json
// Express 서버의 초기 설정 값들을 넣고 조절하는 파일
// 직접 작성하여 파일을 생성해도 되고, npm init 명령어를 실행하여 생성해도 된다.