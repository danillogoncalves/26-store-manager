const connection = require('./database');

const getAllProducts = async () => {
  const QUERY = 'SELECT * FROM products';
  const [result] = await connection.execute(QUERY);
  return result;
};

const findByProductId = async (id) => {
  const QUERY = `SELECT * FROM products
  WHERE id = ?`;
  const [[result]] = await connection.execute(
    QUERY,
    [id],
  );
  return result;
};

module.exports = {
  getAllProducts,
  findByProductId,
};