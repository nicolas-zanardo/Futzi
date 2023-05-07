const express = require('express');
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const {
    createTrainingController,
    getAllTrainingController,
    deleteTrainingController,
    countTrainingByCategoryController
} = require("../../controller/soccer-training.controller");

const training = express.Router();


training.post('/create', isLoggedAdmin, createTrainingController);
training.get('/all', isLoggedAdmin, getAllTrainingController);
training.delete('/delete/:id', isLoggedAdmin, deleteTrainingController)
training.get('/count-training-by-category', isLoggedAdmin, countTrainingByCategoryController)


module.exports = training;