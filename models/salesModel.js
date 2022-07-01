const connection = require('./database');

const createSales = async (sales) => {
  const QUERY_SALES = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(QUERY_SALES);

  const QUERY_SALES_PRODUCTS = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES`;
  const newQuery = sales.reduce((acc, _curr, index, array) => {
    if ((array.length - 1) === index) {
      const newAcc = `${acc} (?, ?, ?)`;
      return newAcc;
    }
    const newAcc = `${acc} (?, ?, ?),`;
    return newAcc;
  }, QUERY_SALES_PRODUCTS);
  const salesData = sales
    .reduce((acc, { productId, quantity }) => [...acc, insertId, productId, quantity], []);
  await connection.execute(newQuery, salesData);
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  createSales,
};
