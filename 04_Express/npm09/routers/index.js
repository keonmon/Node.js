const express = require('express');

// const app = express();
const router = express.Router();

// app.get('/', (req, res)=>{});
router.get('/', (req, res)=>{
    res.send("<h1>Hello, Express router - index - '/'</h1>");
});

router.get('/about', (req, res)=>{
    res.send("<h1>Hello, Express router - index - '/about'</h1>");
});

module.exports = router;