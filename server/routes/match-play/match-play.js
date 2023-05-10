const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {
    createMatchPlayController,
    getAllNextMatchPlayController,
    getAllMatchPlayController,
    deleteMatchController,
    getAllNextMatchOfTheDayController, getMatchOfTheDayController
} = require("../../controller/match-play.controller");

const matchPlay = express.Router()

matchPlay.post('/create', isLoggedAdmin, createMatchPlayController);
matchPlay.get('/get-all-next-match-play', isLoggedAdmin, getAllNextMatchPlayController);
matchPlay.get('/get-all', isLoggedAdmin, getAllMatchPlayController);
matchPlay.delete('/delete/:id', isLoggedAdmin, deleteMatchController);
matchPlay.get('get-the-last-10-match', getMatchOfTheDayController)
matchPlay.get('/get-next-match-of-the-day', getAllNextMatchOfTheDayController);
matchPlay.get('/get-match-of-the-day', getMatchOfTheDayController);

module.exports = matchPlay