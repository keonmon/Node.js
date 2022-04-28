const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            subject:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }, 
            content:{
                type:Sequelize.STRING(1000),
                allowNull:false,
            }, 
            readCount:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
                defaultValue:0,
            }, 
            created_at:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                allowNull:true,
            }, 
            filename:{
                type:Sequelize.STRING(100),
                allowNull:true,
            }, 
            realfilename:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
        },
        {
            sequelize,
            timestamps:false,   // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            modelName:'Board',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'boards',  // 데이터베이스의 자체 테이블의 이름
            paranoid:false,     // 이 멤버가 true면, deleteAt(삭제시간) 필드가 생성된다
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Board.belongsTo(db.Member, {foreignKey:'writer', targetKey:'userid'})
        // 해당 게시글이 지워지면 해당 boardnum인 댓글이 같이 지워짐 (onDelete:'cascade')
        db.Board.hasMany(db.Reply, {foreignKey:'boardnum', sourceKey:'id', onDelete:'cascade' })
    }
};