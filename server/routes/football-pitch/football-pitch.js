const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllFootballPitchController} = require("../../controller/football-pitch.controller");


const footballPitch = express.Router();

footballPitch.get("/all", isLoggedAdmin, getAllFootballPitchController)

module.exports = footballPitch;