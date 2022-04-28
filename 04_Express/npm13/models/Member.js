// userid, pwd, name, phone, email, create_at들을 필드로 하는 모델을 만들어주세요.
// board의 write와 member의 userid와 N:1 관계를 설정해주세요
// 기타 설정은 board와 같은 설정이거나 맞춰 설정한다.


// userid에 기본키설정이 되어있기 떄문에 자동으로 생성되는 id(일련번호)필드는 생성되지 않는다.
const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            userid:{
                type:Sequelize.STRING(30),
                allowNull:false,
                primaryKey:true,
                unique:true,
            },
            pwd:{
                type:Sequelize.STRING(30),
                allowNull:false,
            }, 
            name:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }, 
            phone:{
                type:Sequelize.STRING(30),
                allowNull : false,
            }, 
            email:{
                type:Sequelize.STRING(100),
                allowNull : true,
            }, 
            created_at:{
                type:Sequelize.DATE,
                allowNull : true,
                defaultValue:Sequelize.NOW,
            },
        },
        {
            sequelize,
            timestamps:false,   // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            modelName:'Member',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'members',  // 데이터베이스의 자체 테이블의 이름
            paranoid:false,     // 이 멤버가 true면, deleteAt(삭제시간) 필드가 생성된다
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Member.hasMany(db.Board, {foreignKey:'writer', sourceKey:'userid', onDelete:'cascade'})
    }
};