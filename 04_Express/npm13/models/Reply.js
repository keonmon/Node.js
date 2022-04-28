const Sequelize = require('sequelize');

module.exports = class Reply extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            writer:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            content:{
                type:Sequelize.STRING(200),
                allowNull:false,
            },
            created_at:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,                
                allowNull:false,
            }
        },
        {
            sequelize,
            timestamps:false,   // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            modelName:'Reply',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'replys',  // 데이터베이스의 자체 테이블의 이름
            paranoid:false,     // 이 멤버가 true면, deleteAt(삭제시간) 필드가 생성된다
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Reply.belongsTo(db.Board, {foreignKey:'boardnum', targetKey:'id'});
    }
};