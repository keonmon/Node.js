// hashtag.js

const Sequelize = require('sequelize');
module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
        },{
            sequelize,
            timestamps:false,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성된다.
            underscored:false,
            paranoid:false, 
            modelName:'Hashtag', 
            tableName:'hashtags',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through:'PostHashtag'});
    }
};

// hashtags 테이블의 필드는 id와 title 둘뿐이다.
// posts 테이블과 M:N관계가 성립

// posts 테이블
// 1번 게시물 : #사과 #배
// 2번 게시물 : #배 #오렌지
// 3번 게시물 : #오렌지 #사과

// 중간에 다리역할을 하는 테이블이 필요하다.
// 위 코드로 자동 생성할 수 있다.
// 1번 게시물 - 1번 해시태그
// 1번 게시물 - 2번 해시태그
// 2번 게시물 - 2번 해시태그
// 2번 게시물 - 3번 해시태그
// 3번 게시물 - 1번 해시태그
// 3번 게시물 - 3번 해시태그

// hashtags 테이블
// 1번 해시태그 - 사과
// 1번 해시태그 - 배
// 1번 해시태그 - 오렌지