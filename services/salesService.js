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

const deleteSale = async (id) => {
  const [result] = await salesModel.findBySaleId(id);
  console.log(result, 'delete');
  if (!result) return { error: { code: 404, message: 'Sale not found' } };
  await salesModel.deleteSale(id);
};

const updateSale = async (id, saleUpdate) => {
  const sale = await salesModel.findBySaleId(id);
  console.log(sale, 'update');
  if (!sale[0]) return { error: { code: 404, message: 'Sale not found' } };

  const products = await productsModel.getAllProducts();

  const isProductId = saleUpdate
    .every(({ productId }) => products.some((product) => product.id === productId));

  if (!isProductId) return { error: { code: 404, message: 'Product not found' } };

  const newSale = sale
    .map((elementSale) => ({ productId: elementSale.productId, quantity: elementSale.quantity }));

  const result = await salesModel.updateSale(id, saleUpdate, newSale);

  return result;
};

module.exports = {
  createSales,
  getAllSales,
  findBySaleId,
  deleteSale,
  updateSale,
};