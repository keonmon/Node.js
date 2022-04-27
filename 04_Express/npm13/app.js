
const express = require('express');

// 추가모듈
const nunjucks = require('nunjucks');
const path = require('path');
const cookie = require('cookie-parser');
const session = require('express-session');
const deteFilter = require('nunjucks-date-filter'); //넌적스에서 사용할 날짜 양식 필터 사용을 위한 모듈

const indexRouter = require('./routers');
const memberRouter = require('./routers/members');
const boardRouter = require('./routers/boards');


const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
let env = nunjucks.configure('views', { express:app, watch:true,});

app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'dlrjsgml',
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', indexRouter);
app.use('/members', memberRouter);
app.use('/boards', boardRouter);




// sequelize 설정
const{ sequelize } = require('./models');
const cookieParser = require('cookie-parser');
sequelize.sync({force:false})
.then(()=>{console.log('데이터베이스 연결 성공');})
.catch((err)=>{console.error(err);});


// 에러처리 미들우에ㅓ
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res,next)=>{
    res.locals.message = res.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    // console.error(err);
    res.render('error');
});





app.get('/', (req, res)=>{
    res.send('안녕하세요');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});