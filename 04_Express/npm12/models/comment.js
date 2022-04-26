// comment.js
const Sequelize = require('sequelize');

// 필드 : comment(String(100), notnull), created_at(Date, null))
// 테이블 옵션은 User와 같게한다. 단, modelName:'Comment', tableName:'comments'로 설정
// 위 두개의 필드를 갖는 Comment모델(클래스)를 만들고 export 해주세요

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            // id필드는 현재 테이블에 기본키로 자동생성(값이 자동증가)
            // 누가 댓글을 썼는지에 대한 필드 : commenter정도의 이름으로 생성될 필드
            // 외래키 설정시 역시 자동생성된다. -> users테이블의 id가 복사되어, 현재 테이블의 필드로 삽입생성된다.
            // 외래키로 설정될 필드는 따로 기술하지 않고, 외래키에서 설정함과 동시에 자동생성되도록 한다. (associate에서 설정)
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            create_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW,
            },
        },
        {
            sequelize,
            timestamps:false,  
            underscored:false,  
            modelName:'Comment',   
            tableName:'comments',  
            paranoid:false, 
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        // Comment모델의 commenter필드가 User모델의 id필드를 참조하면서 복사 & 생성된다.
        db.Comment.belongsTo(db.User, {foreignKey:'commenter', sourceKey:'id'} );
    }
};