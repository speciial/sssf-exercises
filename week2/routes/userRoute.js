"use strict";
const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.user_list_get);

userRouter.get('/:id', userController.user_get);

userRouter.post('/', (req, res) => {
    console.log(req.body);
    res.send('With this endpoint you can add users');
});

userRouter.put('/', (req, res) => {
    res.send('With this endpoint you can edit users');
});

userRouter.delete('/', (req, res) => {
    res.send('With this endpoint you can delete users');
});

module.exports = userRouter;