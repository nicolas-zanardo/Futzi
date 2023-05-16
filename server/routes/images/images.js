const express = require('express');
const {getImagesUrl} = require("../../controller/images.controller");

const imageRoute = express.Router();

imageRoute.get('/public/*',getImagesUrl)

module.exports = imageRoute;