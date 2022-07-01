const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createSales = async (sales) => {
  const products = await productsModel.getAllProducts();

  const isProductId = sales
    .every(({ productId }) => products.some(({ id }) => id === productId));

  if (!isProductId) return { error: { code: 404, message: 'Product not found' } };

  const result = await salesModel.createSales(sales);
  return result;
};

module.exports = {
  createSales,
};