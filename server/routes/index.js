const express = require('express');
const usersRoute = require('./user/users');
const authLoginRoute = require('./auth/login')
const teamOsnyRoute = require('./team/team')
const index = express.Router();

/* GET home page. */
index.use('/api/user', usersRoute);
index.use('/api/auth', authLoginRoute);
index.use('/api/team', teamOsnyRoute);

module.exports = index;
