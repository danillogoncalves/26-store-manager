const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/database');
const productsModels = require('../../../models/productsModel');

const LIST = [
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
  }
]

const PRODUCT = [
  {
    "id": 1,
    "name": "Martelo de Thor",
  }
]

describe('#productsModel', () => {
  describe('#getAllProducts', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna uma lista de produtos.', async () => {
      sinon.stub(connection, 'execute').resolves([LIST]);
      const response = await productsModels.getAllProducts();
      expect(response).to.be.deep.eq(LIST);
    })
    it('Retorna um único produto.', async () => {
      const PRODUCT_ID = 1;
      sinon.stub(connection, 'execute').resolves([PRODUCT]);
      const response = await productsModels.findByProductId(PRODUCT_ID);
      expect(response).to.be.deep.eq(PRODUCT[0]);
    })
  });
});