const express = require('express');
const productsController = require('../controllers/productsController');
const productsValidad = require('../middlewares/productsValidad');

const route = express.Router();

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.findByProductId);
route.post('/', productsValidad.nameValidad, productsController.createProduct);
route.put('/:id', productsValidad.nameValidad, productsController.updateProduct);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;