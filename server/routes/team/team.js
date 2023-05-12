const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {findTeamController, updateTeamController} = require("../../controller/team.controller");

const team = express.Router();


team.get("/:currentTeam", findTeamController);
team.put("/update", isLoggedAdmin, updateTeamController);

module.exports = team;