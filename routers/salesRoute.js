const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidad = require('../middlewares/salesValidad');

const route = express.Router();

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.findBySaleId);
route.post('/', salesValidad.salesValidad, salesController.createSales);
route.delete('/:id', salesController.deleteSale);

module.exports = route;