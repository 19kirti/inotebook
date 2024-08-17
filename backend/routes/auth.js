const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


//create a user using POST "/api/auth". Doesn't require Auth

router.post('/', [
    body('name', 'Name must be min of 3 letters').isLength({min: 3}),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be min of 5 char').isLength({min: 5}),
] , 

 (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err => {
        console.log(err)
        res.json({
            error: 'Please enter a unique value for email',
            message: err.message
        })
    })

})



module.exports = router;