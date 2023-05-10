const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllFootballPitchController, updateFootballController, deleteFootballController} = require("../../controller/football-pitch.controller");


const footballPitch = express.Router();

footballPitch.get("/all", isLoggedAdmin, getAllFootballPitchController);
footballPitch.put("/update", isLoggedAdmin, updateFootballController);
footballPitch.delete('/delete/:id', isLoggedAdmin, deleteFootballController);

module.exports = footballPitch;