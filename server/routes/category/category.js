const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllCategoriesController, updateCategoryController} = require("../../controller/category.controller");


const category = express.Router();

category.get("/all", isLoggedAdmin, getAllCategoriesController);
category.put('/update', isLoggedAdmin, updateCategoryController);
category.delete('/delete/:id')

module.exports = category;