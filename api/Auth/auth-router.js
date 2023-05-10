const router = require('express').Router();
const User = require('../Users/users-model');
const authMd = require('./auth-middleware');



router.post('/register', authMd.payloadCheck, 
                        authMd.isEmailUnique,
                        authMd.hashPassword, 
                        async (req,res,next)=>{
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({message: `Welcome ${newUser.name}!...`});
    } catch(err) {
        next(err)
    }
})


router.post('/login', authMd.payloadCheck, 
                      authMd.isRegisteredUser,
                      authMd.isPasswordCorrect,
                      authMd.generateToken,
                      (req,res,next)=>{
    try {
        res.json({message: `Welcome back ${req.user.name}!...`,
                 token: req.user.token})

    } catch(err) {
        next(err)
    }

})


module.exports = router;