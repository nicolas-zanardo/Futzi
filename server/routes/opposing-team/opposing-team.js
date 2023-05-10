const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllOpposingTeamController, updateOpposingTeamController, deleteOpposingTeamController} = require("../../controller/opposing-team.controller");

const opposingTeam = express.Router();

opposingTeam.get("/all", isLoggedAdmin, getAllOpposingTeamController)
opposingTeam.put('/update', isLoggedAdmin, updateOpposingTeamController);
opposingTeam.delete('/delete/:id', isLoggedAdmin, deleteOpposingTeamController);

module.exports = opposingTeam;