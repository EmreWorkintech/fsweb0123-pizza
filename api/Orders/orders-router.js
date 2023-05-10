const router = require('express').Router();
const Order = require('./orders-model');
const authMd = require('../Auth/auth-middleware');

router.get('/', authMd.checkRole("Admin"), async (req,res,next)=>{
    try {
        const orders = await Order.getAll();
        res.json(orders);
    } catch(err) {
        next(err)
    }
    
})

router.get('/:id', async (req,res,next)=>{
    try {
        const orders = Order.getById(req.params.id);
        res.json(orders);
    } catch(err) {
        next(err)
    }
    
})


router.post('/', async (req,res,next)=>{
    try {
        const order = req.body;
        const newOrder = await Order.create(order);
        if (newOrder) {
            res.json(newOrder);
        } else {
            next({message: "Order kayıt işleminde hata oluştu!..."})
        }
    } catch(err) {
        next(err)
    }
})


router.put('/:id', (req,res,next)=>{

})


router.delete('/:id', (req,res,next)=>{

})


module.exports = router;