const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {
    createMatchPlayController,
    getAllNextMatchPlayController,
    getAllMatchPlayController,
    deleteMatchController,
    getAllNextMatchOfTheDayController,
    getMatchOfTheDayController,
    getTenLastMatchController,
    getCountAllMatchInSeasonController
} = require("../../controller/match-play.controller");

const matchPlay = express.Router()

// ADMIN
matchPlay.post('/create', isLoggedAdmin, createMatchPlayController);
matchPlay.get('/get-all-next-match-play', isLoggedAdmin, getAllNextMatchPlayController);
matchPlay.get('/get-all', isLoggedAdmin, getAllMatchPlayController);
matchPlay.delete('/delete/:id', isLoggedAdmin, deleteMatchController);
matchPlay.post('/all-match-in-season', isLoggedAdmin, getCountAllMatchInSeasonController)

// PUBIC
matchPlay.get('/get-the-last-10-match', getTenLastMatchController)
matchPlay.get('/get-next-match-of-the-day', getAllNextMatchOfTheDayController);
matchPlay.get('/get-match-of-the-day', getMatchOfTheDayController);

module.exports = matchPlay