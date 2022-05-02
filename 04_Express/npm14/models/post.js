// 모델명 : Post, 테이블명:posts
// 필드 : content(140)notnull, img(200)null, user와 1:n 관계표시 - user모델 생성후 설정
// timestamp true, underscored false, paranoid false 나머지 기존설정
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            content:{
                type:Sequelize.STRING(200),
                allowNull:false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
        },{
            sequelize,
            timestamp:true,   // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            underscored:false,
            paranoid:false,     // 이 멤버가 true면, deleteAt(삭제시간) 필드가 생성된다
            modelName:'Post',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'posts',  // 데이터베이스의 자체 테이블의 이름
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        //db.Post.belongTo(db.User, {foreignKey:'', targetKey:'' })
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
    }
};