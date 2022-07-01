const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidad = require('../middlewares/salesValidad');

const route = express.Router();

route.post('/', salesValidad.salesValidad, salesController.createSales);

module.exports = route;