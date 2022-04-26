// node가 sequelize를 이용해서 mysql에 테이블을 생성하거나 조작할 수 있는 "테이블모델"을 만든다.
const Sequelize = require('sequelize');

// 아래의 형태로 만들어진 객체를 exports하고, index.js에서 가져다 쓸 예정
// user.js -> index.js -> app.js 이 방향으로 require된다.

// class User {};
// class User extends Sequelize.Model {};
// module.exports = class User extends Sequelize.Model {};

/*
module.exports = class User extends Sequelize.Model {
    // 테이블을 생성하고 초기화하는 함수
    static init ( sequelize ){}

    // 테이블간 관계 설정 함수
    static associate(db){}
};
*/
/*
module.exports = class User extends Sequelize.Model {
    // 테이블을 생성하고 초기화하는 함수
    static init ( sequelize ){
        return super.init({
            
        },
        {
            
        });
    }
    
    // 테이블간 관계 설정 함수
    static associate(db){}
};
*/

// 외부에서 User를 requier하고,  User.init( Sequelize ); 로 같이 호출될 예정
module.exports = class User extends Sequelize.Model {
    // '테이블을 생성'하고 초기화하는 함수
    static init ( sequelize ){
        return super.init({
            // init함수에 각 필드의 이름(키)과 객체속성들(값)이 매칭된 객체가 전달된다.
            // 각 필드를 객체 멤버 형식으로 나열한다.
            // 각 멤버들의 값들도 객체로 구성된다.
            name : {
                type:Sequelize.STRING(20),
                allowNull:false,    // null을 허용하겠는가 ( false = NOTNULL )
                unique:false,   // unique 여부
            },
            age : {
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
            married : {
                type:Sequelize.BOOLEAN,
                allowNull:true,
            },
            comment : {
                type:Sequelize.TEXT,
                allowNull:true,
            },
            created_at : {  // 레코드의 insert 시점( 날짜 시간 )
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW,
            },
            // 첫번째 필드 (id)는 따로 기술하지 않아도 자동증가 필드로 추가된다.
        },
        {   // 테이블의 옵션들이 멤버형식으로 정의된다.
            sequelize,
            timestamps:false,   // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            underscored:false,  // 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드의 이름이 create_at, update_at으로 바뀐다.
            modelName:'User',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'users',  // 데이터베이스의 자체 테이블의 이름
            paranoid:false,     // 이 멤버가 true면, deleteAt(삭제시간) 필드가 생성된다
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

            // createAt(생성시간) : 레코드 insert된 시간
            // updateAt(수정시간) : 레코드update된 시간
            // deleteAt(삭제시간) : 레코드가 삭제된 시간 (실제 데이터는 삭제되지 않고 시간만 기록)
        });
    }

    // 테이블간 관계 설정 함수
    static associate(db){
        // User모델의 필드값이 Comment모델에 같은 필드값으로 여러번 나오도록 설정(1:N 관계) 
        db.User.hasMany(db.Comment, {foreignKey:'commenter', sourceKey:'id'} );
        // User 모델의 id필드를 Comment 모델에 commenter 필드로 복사하고, 관계설정을 한다.
    }
};