const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const Comment = require('./comment');

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;   // db에 연결하기 위한 연결객체를 db객체에 담는다.
db.Sequelize = Sequelize;   // 현재 파일에 require한 Sequelize를 db객체에 담는다.
// db = {sequelize:sequelize, Sequelize:Sequelize } 한다는 것

// require한 user모델과 comment 모델도 db에 담는다.
db.User = User;
db.Comment = Comment;

// '모델객체 초기화 함수'와 '관계 형성 함수'를 실행한다.
User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

// 여기까지의 코드가 테이블 생성 내용을 구성하는 코드
// 이제 db가 export가 되고, app.js에 require하면 require된 db에서 sequelize를 꺼내어 sync함수를 실행하게 되고, 이때 테이블이 생성된다. 

module.exports = db;
