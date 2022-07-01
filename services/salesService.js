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

const getAllSales = async () => {
  const result = salesModel.getAllSales();
  return result;
};

const findBySaleId = async (id) => {
  const result = await salesModel.findBySaleId(id);
  if (!result[0]) return { error: { code: 404, message: 'Sale not found' } };
  return result;
};

module.exports = {
  createSales,
  getAllSales,
  findBySaleId,
};