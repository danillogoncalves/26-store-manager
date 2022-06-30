const connection = require('./database');

const getAllProducts = async () => {
  const QUERY = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(QUERY);
  return result;
};

const findByProductId = async (id) => {
  const QUERY = `SELECT * FROM StoreManager.products
  WHERE id = ?`;
  const [[result]] = await connection.execute(
    QUERY,
    [id],
  );
  return result;
};

const createProduct = async (name) => {
  const QUERY = `INSERT INTO StoreManager.products (name)
  VALUES (?)`;
  const [{ insertId }] = await connection.execute(
    QUERY,
    [name],
  );
  return { id: insertId, name };
};

module.exports = {
  getAllProducts,
  findByProductId,
  createProduct,
};