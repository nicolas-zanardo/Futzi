const express = require('express');
const usersRoute = require('./user/users');
const authLoginRoute = require('./auth/login')
const teamOsnyRoute = require('./team/team')
const categoryRoute = require('./category/category')
const footballPictRoute = require('./football-pitch/football-pitch')
const trainingRouting = require('./soccer-training/soccer-training')
const opposingTeamRouter = require('./opposing-team/opposing-team')
const matchPlayRouter = require('./match-play/match-play')
const index = express.Router();

/* GET home page. */
index.use('/api/user', usersRoute);
index.use('/api/auth', authLoginRoute);
index.use('/api/team', teamOsnyRoute);
index.use('/api/category', categoryRoute)
index.use('/api/football-pitch', footballPictRoute)
index.use('/api/training', trainingRouting)
index.use('/api/opposing-team', opposingTeamRouter)
index.use('/api/match-play', matchPlayRouter)

module.exports = index;
