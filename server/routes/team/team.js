const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {findTeamController, updateTeamController, deleteTeamController} = require("../../controller/team.controller");

const team = express.Router();


team.get("/:currentTeam", isLoggedAdmin, findTeamController);
team.put("/update", isLoggedAdmin, updateTeamController);
team.delete('delete/id', isLoggedAdmin, deleteTeamController)

module.exports = team;