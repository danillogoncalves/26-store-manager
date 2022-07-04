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

const getAllSales = async () => {
  const QUERY = `SELECT S.id AS saleId, S.date,
SP.product_id AS productId, SP.quantity FROM StoreManager.sales_products AS SP
INNER JOIN StoreManager.sales AS S ON SP.sale_id = S.id;`;
  const [result] = await connection.execute(QUERY);
  return result;
};

const findBySaleId = async (id) => {
  const QUERY = `SELECT S.date, SP.product_id AS productId, SP.quantity
FROM StoreManager.sales_products AS SP
INNER JOIN StoreManager.sales AS S ON SP.sale_id = S.id
WHERE S.id = ?;`;
  const [result] = await connection.execute(QUERY, [id]);
  return result;
};

const deleteSale = async (id) => {
  const QUERY_SALES_PRODUCTS = `DELETE
FROM StoreManager.sales_products
WHERE sale_id = ?;
`;
  const QUERY_SALES = `DELETE
FROM StoreManager.sales
WHERE id = ?;`;
  await connection.execute(QUERY_SALES_PRODUCTS, [id]);
  await connection.execute(QUERY_SALES, [id]);
};

const updateSale = async (id, saleUpdate, saleDatabase) => {
  await Promise.all(
    saleUpdate.map(({ productId, quantity }, index) => {
      const QUERY = `UPDATE StoreManager.sales_products
      SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ?`;
      return connection.execute(QUERY, [productId, quantity, id, saleDatabase[index].productId]);
    }),
  );
  return { saleId: id, itemsUpdated: saleUpdate };
};

module.exports = {
  createSales,
  getAllSales,
  findBySaleId,
  deleteSale,
  updateSale,
};
