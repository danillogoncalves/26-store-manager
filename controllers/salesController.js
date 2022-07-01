const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const result = await salesService.createSales(req.body);
  if (result.error) return res.status(result.error.code).json({ message: result.error.message });
  res.status(201).json(result);
};

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();
  res.status(200).json(result);
};

const findBySaleId = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findBySaleId(id);
  if (result.error) return res.status(result.error.code).json({ message: result.error.message });
  res.status(200).json(result);
};

module.exports = {
  createSales,
  getAllSales,
  findBySaleId,
};