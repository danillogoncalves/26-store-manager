const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const findByProductId = async (id) => {
  const result = await productsModel.findByProductId(id);
  if (!result) return { error: { code: 404, message: 'Product not found' } };
  return result;
};

const createProduct = async (name) => {
  const result = await productsModel.createProduct(name);
  return result;
};

module.exports = {
  getAllProducts,
  findByProductId,
  createProduct,
};