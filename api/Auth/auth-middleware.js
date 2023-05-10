const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HASH_ROUND, JWT_SECRET } = require('../../config/config');
const User = require('../Users/users-model');

function protected(req,res,next) {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, JWT_SECRET, (err,decodedJWT)=>{
            if(err) {
                next(err)
            } else {
                req.decodedJWT = decodedJWT;
                next();
            }
        })
    } catch(err) {
        next(err)
    }
}

function payloadCheck(req,res,next) {
    try {
        const user = req.body;
        if (!user.password || user.password.trim().length < 4) {
            next({status: 400,message:"password bilgisi eksik veya 4 karakterden küçük!.." })
        } else if (!user.name || user.name.trim().length < 2) {
            next({status: 400,message:"name bilgisi eksik veya tam girilmedi!.." })
        } else if (!user.surname || user.surname.trim().length < 2) {
            next({status: 400,message:"surname bilgisi eksik veya tam girilmedi!.." })
        } else if(!user.email || !validateEmail(user.email)) {
            next({status: 400,message:"email bilgisi eksik veya geçerli bir email değil!.." })
        } else if(!user.role_id) {
            req.body.role_id = 2;
        }
        next()
    } catch(err) {
        next(err)
    }
}


async function isEmailUnique(req,res,next) {
    try {
        const users = await User.getByFilter({email: req.body.email});
        if(users.length > 0) {
            next({status: 400,message:"Email adresi boşta değil!..." })
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

function hashPassword(req,res,next) {
    try {
        const { password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, HASH_ROUND);
        console.log(hashedPassword);
        req.body.password = hashedPassword;
        next()
    } catch(err) {
        next(err)
    }
}

const checkRole = (role) => (req,res,next)=> {
    try {
        if(req.decodedJWT && 
            req.decodedJWT.role_name && 
            req.decodedJWT.role_name == role) {
                next()
        } else {
            next({status: 403,message:"Buraya erişim izniniz yok!.." })
        }
    } catch(err) {
        next(err)
    }
}

async function isRegisteredUser(req,res,next){
    try {
        const users = await User.getByFilter({email: req.body.email});
        if(users[0]){
            req.user = users[0];
            next()
        } else {
            next({status: 400,message:"Invalid credentials!..." })
        }
    } catch(err) {
        next(err)
    }
}


function isPasswordCorrect(req,res,next){
    try {
        if(bcrypt.compareSync(req.body.password, req.user.password)) {
            next()
        } else {
            next({status: 400,message:"Invalid credentials!..." })
        }
    } catch(err) {
        next(err)
    }
}


function generateToken(req,res,next){
    try {
        const payload = {
            userId: req.user.id,
            role_name: req.user.role_name,
            name: req.user.name
        }
        const options = {
            expiresIn: "8h"
        }
        const token = jwt.sign(payload, JWT_SECRET, options);
        req.user.token = token;
        next();
    } catch(err) {
        next(err)
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = {
    protected,
    payloadCheck,
    hashPassword,
    checkRole,
    isEmailUnique,
    isRegisteredUser,
    generateToken,
    isPasswordCorrect,
}