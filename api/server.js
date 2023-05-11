const express = require('express');
const server = express();
require('dotenv').config();
const authRouter = require('./Auth/auth-router');
const usersRouter = require('./Users/users-router');
const ordersRouter = require('./Orders/orders-router');
const authMd = require('./Auth/auth-middleware');

server.use(express.json());

server.get('/', (req,res)=> {
    res.json({message: "Server is up and running!..."})
})

server.use('/api/auth', authRouter);
server.use('/api/users', authMd.restricted, authMd.checkRole("Admin"), usersRouter);
server.use('/api/orders', authMd.restricted, ordersRouter);


server.use((err,req,res,next)=> {
    res.status(err.status || 500)
        .json({message: err.message || "Server error!..."})
})

module.exports = server;