const express = require('express');
const productsController = require('../controllers/productsController');

const route = express.Router();

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.findByProductId);
route.post('/', productsController.createProduct);

module.exports = route;