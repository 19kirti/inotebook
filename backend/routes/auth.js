const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


//create a user using POST "/api/auth/user". No Login required

router.post('/createuser', [
    body('name', 'Name must be min of 3 letters').isLength({min: 3}),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be min of 5 char').isLength({min: 5}),
] , 

 async (req, res)=>{
    //if there are errors, return bad requests and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
     //check if the user with this email already exists or not

     try{
     let user = await User.findOne({email: req.body.email});
     console.log(user)
     if(user){
        return res.status(400).json({error: "User already exists with this email"});
     }

    user = User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    
    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err)
    //     res.json({
    //         error: 'Please enter a unique value for email',
    //         message: err.message
    //     })
    // })

    res.json(user);
}
catch(error){
    console.error(error.message);
    res.status(500).send("some error occurred");
}

})



module.exports = router;