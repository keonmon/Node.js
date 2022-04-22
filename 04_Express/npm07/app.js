const express = require('express');
const path=require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', express.static(path.join(__dirname, 'uploads')));

// 업로드를 하려면 업로드된 파일이 저장될 폴더를 지정해야한다.
// 지난 프로젝트러첢 폴더를 직접 만들지는 않고, 
// 'fs모듈을 활용'하여 이용하려는 폴더가 있으면 그 폴더를 사용,
// 없으면 새로 생성하는 기능을 사용한다.
// 파일 폴더와 같은 외부의 리소스를 다루는 작업은 명령 오류와 상관없이 디스크 상태에 따라 오류가 발생할 수 있으며, 스스로 예외처리를 해준다.
// 특히 직음은 readdirSync가 실행될 때 해당 폴더가 없다면 에러가 발생하므로 그에 대한 처리로 예외처리를 이용한다.
try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads폴더가 없어 새로 생성합니다.');
    fs.mkdirSync('uploads');
}

// 현제 프로젝트에서 사용할 multer 객체를 생성한다. 객체이름은 upload
// multer함수에 전달인수로 객체 하나를 전달하는데 그 객체에는 storage와 limits라는 속성이 포함된다.
/*
const upload = multer({
    storage:multer.diskStorage(),
    limits : {},
});
*/
const upload = multer({
    storage:multer.diskStorage(
        {
            destination(req, file, done){
                done(null, 'uploads/'); //폴더 설정
                // 첫번째 인수 null은 현재파일(file)의 경로와 이름 그대로 사용.
                // (변경 및 추가 없음)
            },
            filename(req, file, done){
                const ext = path.extname(file.originalname);    //확장자 추출
                //확장자를 뺀 파일이름 + 오늘 날짜(밀리초) + 추출된 확장자로 저장 파일명 변경
                done(null, path.basename(file.originalname,ext)+Date.now()+ext);
                // abc.jpg -> 'abc' + 12345214 + '.jpg' -> abc12345214.jpg
                // 업로드 파일명이 같은 경우 cos처럼 처리할 객체가 없고, 위와같은 방법으로 파일명의 충돌을 방지한다(오늘날짜시간의 밀리초 값)
            },
        }
    ),
    limits : {
        fileSize: 5* 1024 * 1024
    },
});




app.get('/', (req, res)=>{
    res.sendFile( path.join(__dirname, 'multer.html'));

});


app.post('/upload', upload.single('image'), (req,res)=>{
    console.log( req.file );
    console.log( req.body.title );
    return res.json({
        title:req.body.title,
        filename : req.file.filename,
    })
});



app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});