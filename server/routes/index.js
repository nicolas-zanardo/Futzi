const express = require('express');
const usersRoute = require('./user/users');
const authLoginRoute = require('./auth/login')
const index = express.Router();

/* GET home page. */
index.use('/api/user', usersRoute);
index.use('/api/auth', authLoginRoute);

module.exports = index;
