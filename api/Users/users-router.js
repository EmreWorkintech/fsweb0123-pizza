const router = require('express').Router();
const User = require('./users-model');

router.get('/', async (req,res,next)=>{
    try {
        const users = await User.getAll();
        res.json(users);
    } catch(err) {
        next(err)
    }
    
})


router.post('/', (req,res,next)=>{

})


router.put('/:id', (req,res,next)=>{

})


router.delete('/:id', (req,res,next)=>{

})


module.exports = router;