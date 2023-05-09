const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {
    createMatchPlayController,
    getAllNextMatchPlayController,
    getAllMatchPlayController,
    deleteMatchController,
    getAllNextMatchOfTheDayController
} = require("../../controller/match-play.controller");

const matchPlay = express.Router()

matchPlay.post('/create', isLoggedAdmin, createMatchPlayController)
matchPlay.get('/get-all-next-match-play', isLoggedAdmin, getAllNextMatchPlayController)
matchPlay.get('/get-next-match-of-the-day', isLoggedAdmin, getAllNextMatchOfTheDayController)
matchPlay.get('/get-all', isLoggedAdmin, getAllMatchPlayController)
matchPlay.delete('/delete/:id', isLoggedAdmin, deleteMatchController)

module.exports = matchPlay