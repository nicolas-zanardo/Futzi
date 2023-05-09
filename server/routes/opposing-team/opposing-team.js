const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllOpposingTeamController} = require("../../controller/opposing-team.controller");

const opposingTeam = express.Router();

opposingTeam.get("/all", isLoggedAdmin, getAllOpposingTeamController)

module.exports = opposingTeam;