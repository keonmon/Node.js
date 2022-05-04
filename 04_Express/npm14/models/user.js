const Sequelize = require('sequelize');

// id는 자동생성
// email(문자 50)null 고유값, nick(문자30)notnull, password(문자100)notnull, provider(문자20)notnull default='local', snsid(문자30)null
// 모델명:User, 테이블명 users, 나머지 associate 설정은 posts테이블과 같다

module.exports = class User extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            email:{ 
                type:Sequelize.STRING(50),
                allowNull:true,
                unique:true,    // null값은 고유값 적용이 되지 않는다. (null이 여러개 있어도 괜춘)
             }, 
            nick:{
                type:Sequelize.STRING(30),
                allowNull:false,
            }, 
            password:{
                type:Sequelize.STRING(200),
                allowNull:true,
            }, 
            provider:{
                type:Sequelize.STRING(20),
                allowNull:false,
                defaultValue:'local',
            }, 
            snsid:{
                type:Sequelize.STRING(50),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            underscored:false,
            paranoid:false, 
            modelName:'User', 
            tableName:'users',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        //db.User.hasMany(db.Post, {foriegnKey:'', sourceKey:''});
        db.User.hasMany(db.Post);

        //follower를 위한 것    
        db.User.belongsToMany(db.User, {foreignKey:'followingId', as:'Followers',through:'Follow'}); 

        //following를 위한 것
        db.User.belongsToMany(db.User, {foreignKey:'followerId', as:'Followings', through:'Follow'}); 
    }
}

// 유저1이 유저2를 팔로잉한다 (유저1 -> 유저2)
// 유저1(followers), 유저2(followings)로 레코드 생성

// 반대로 맞팔 하면 (유저1 <- 유저2)
// 유저2(followers), 유저1(followings)로 레코드 생성

// 유저1(followers), 유저3(followings)
// 유저3(followers), 유저1(followings)
// 유저3(followers), 유저2(followings)
// 유저2(followers), 유저3(followings)

// 유저1의 팔로워(followers)를 조회하려면?
// -> following에서 유저1을 조회

// 유저1이 팔로잉(following)하는 유저를 조회하려면?
// -> follower에서 유저1을 조회