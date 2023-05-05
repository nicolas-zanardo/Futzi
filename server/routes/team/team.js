const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {findTeamController, updateTeamController} = require("../../controller/team.controller");

const team = express.Router();


team.get("/osny", isLoggedAdmin, findTeamController);
team.put("/update-osny", isLoggedAdmin, updateTeamController);

module.exports = team;