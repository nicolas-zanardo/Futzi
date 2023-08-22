const express = require('express');
const usersRoute = require('./user/users');
const usersTokenRoute = require('./user/user-token')
const authLoginRoute = require('./auth/login');
const teamOsnyRoute = require('./team/team');
const categoryRoute = require('./category/category');
const footballPictRoute = require('./football-pitch/football-pitch');
const trainingRouting = require('./soccer-training/soccer-training');
const opposingTeamRouter = require('./opposing-team/opposing-team');
const matchPlayRouter = require('./match-play/match-play');
const imageRoute = require('./images/images');
const index = express.Router();

/** ➡️ USER *******************************************************/
index.use('/api/user', usersRoute);
index.use('/api/user/token', usersTokenRoute);

/** ➡️ AUTH *******************************************************/
index.use('/api/auth', authLoginRoute);

/** ➡️ TEAM *******************************************************/
index.use('/api/team', teamOsnyRoute);

/** ➡️ CATEGORY ***************************************************/
index.use('/api/category', categoryRoute)

/** ➡️ FOOTBALL PITCH *********************************************/
index.use('/api/football-pitch', footballPictRoute)

/** ➡️ TRAINING ***************************************************/
index.use('/api/training', trainingRouting)

/** ➡️ OPPOSING TEAM **********************************************/
index.use('/api/opposing-team', opposingTeamRouter)

/** ➡️ MATCH PLAY *************************************************/
index.use('/api/match-play', matchPlayRouter)

/** ➡️ IMAGE ******************************************************/
index.use('/api/images', imageRoute)

module.exports = index;
