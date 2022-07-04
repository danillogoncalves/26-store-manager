const express = require('express');
const productsController = require('../controllers/productsController');
const productsValidad = require('../middlewares/productsValidad');

const route = express.Router();

route.get('/search', productsController.searchProducts);
route.get('/:id', productsController.findByProductId);
route.get('/', productsController.getAllProducts);
route.post('/', productsValidad.nameValidad, productsController.createProduct);
route.put('/:id', productsValidad.nameValidad, productsController.updateProduct);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;