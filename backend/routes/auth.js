const express = require('express');
const router = express.Router();
const User = require('./models/User');


//create a user using POST "/api/auth". Doesn't require Auth

router.get('/', (req, res)=>{
    console.log(req.body);
    //res.send('Hello!');
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router;