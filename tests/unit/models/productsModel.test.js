const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/database');
const productsModels = require('../../../models/productsModel');

describe('#productsModel', () => {
  describe('#getAllProducts', () => {
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
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna uma lista de produtos.', async () => {
      sinon.stub(connection, 'execute').resolves([LIST]);
      const response = await productsModels.getAllProducts();
      expect(response).to.be.deep.eq(LIST);
    })
  });
  describe('#findByProductId', () => {
    const PRODUCT = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ]
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna um único produto.', async () => {
      const PRODUCT_ID = 1;
      sinon.stub(connection, 'execute').resolves([PRODUCT]);
      const response = await productsModels.findByProductId(PRODUCT_ID);
      expect(response).to.be.deep.eq(PRODUCT[0]);
    })
  });
  describe('#createProduct', () => {
    const EXPECTE_ID = 4;
    const NAME = "Ms. Marvel";
    beforeEach(() => {
      sinon.restore();
    });
    it('Create e retorna produto criado.', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: EXPECTE_ID }]);
      const response = await productsModels.createProduct(NAME);
      expect(response).to.be.deep.equal({ id: EXPECTE_ID, name: NAME });
    });
  });
});