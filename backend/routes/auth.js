const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "kirtiisa$goodgirl"
const fetchuser = require('../middleware/fetchuser');

//Route-1 : create a user using POST "/api/auth/createuser". No Login required

router.post('/createuser', [
    body('name', 'Name must be min of 3 letters').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be min of 5 char').isLength({ min: 5 }),
],

    async (req, res) => {
        //if there are errors, return bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check if the user with this email already exists or not

        try {
            let user = await User.findOne({ email: req.body.email });
            console.log(user)
            if (user) {
                return res.status(400).json({ error: "User already exists with this email" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
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

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
            res.json({ authToken });

            //res.json(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })



//Route-2 : authenticate a user using POST "/api/auth/login". No Login required

router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],async (req, res) => {
        //if there are errors, return bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
            res.json({authToken});

        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");

        }
    })

    //Route-3 : Get LoggedIn user details using POST "/api/auth/getuser". Login required

    router.post('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        console.error(error.message);
            res.status(500).send("Internal Server Error");
    }
})

module.exports = router;

