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

const updateProduct = async (id, name) => {
  const QUERY = `UPDATE  StoreManager.products
  SET name = ?
  WHERE id = ?`;
  const [{ affectedRows }] = await connection.execute(
    QUERY,
    [name, id],
  );
  return { affectedRows, productInfo: { id, name } };
};

const deleteProduct = async (id) => {
  const QUERY = `DELETE
  FROM StoreManager.products
  WHERE id = ?;`;
  const [{ affectedRows }] = await connection.execute(
    QUERY,
    [id],
  );
  return affectedRows;
};

const searchProducts = async (search) => {
  const QUERY = 'SELECT * FROM products WHERE name LIKE ?;';
  const [result] = await connection.execute(
    QUERY,
    [`%${search}%`],
  );
  return result;
};

module.exports = {
  getAllProducts,
  findByProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};