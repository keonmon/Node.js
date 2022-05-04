// middleware.js    -   도구를 만든다고 생각하면 됨.

const { renderString } = require("nunjucks");

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated() ){
        next();
    } else {
        res.status(403).send('로그인이 필요합니다!');
    }
};

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated() ){
        next();
    } else {
        const message = encodeURIComponent('이미 로그인이 되어있습니다!');
        res.redirect(`/?error=${message}`);
    }
};