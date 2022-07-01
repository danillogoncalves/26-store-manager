const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const result = await salesService.createSales(req.body);
  if (result.error) return res.status(result.error.code).json({ message: result.error.message });
  res.status(201).json(result);
};

module.exports = {
  createSales,
};