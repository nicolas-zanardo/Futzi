const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllCategoriesController} = require("../../controller/category.controller");


const category = express.Router();

category.get("/all", isLoggedAdmin, getAllCategoriesController)

module.exports = category;