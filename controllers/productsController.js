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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProduct(id, name);
  if (result.error) return res.status(result.error.code).json({ message: result.error.message });
  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteProduct(id);
  if (!result) return res.status(204).end();
  res.status(result.error.code).json({ message: result.error.message });
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const result = await productsService.searchProducts(q);
  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  findByProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};