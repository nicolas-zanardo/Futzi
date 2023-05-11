const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {getAllCategoriesController, updateCategoryController, deleteCategoryController} = require("../../controller/category.controller");


const category = express.Router();

category.get("/all", isLoggedAdmin, getAllCategoriesController);
category.put('/update', isLoggedAdmin, updateCategoryController);
category.delete('/delete/:id', isLoggedAdmin, deleteCategoryController)

module.exports = category;