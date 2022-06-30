const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAllProducts();
  res.status(200).json(result);
};

const findByProductId = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findByProductId(id);
  if (result.error) return res.status(result.error.code).json({ message: result.error.message });
  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.createProduct(name);
  res.status(201).json(result);
};

module.exports = {
  getAllProducts,
  findByProductId,
  createProduct,
};