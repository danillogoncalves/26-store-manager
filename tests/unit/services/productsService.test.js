const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('#productsService', () => {
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
      sinon.stub(productsModel, 'getAllProducts').resolves(LIST);
      const response = await productsService.getAllProducts();
      expect(response).to.be.deep.equal(LIST);
    });
  });
  describe('#findByProductId', () => {
    const PRODUCT = {
      "id": 1,
      "name": "Martelo de Thor",
    }
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna um único produto.', async () => {
      const PRODUCT_ID = 1;
      sinon.stub(productsModel, 'findByProductId').resolves(PRODUCT);
      const response = await productsService.findByProductId(PRODUCT_ID);
      expect(response).to.be.deep.equal(PRODUCT);
    });
    it('Retorna um erro com ID inválido.', async () => {
      const PRODUCT_ID = 1001;
      const ERROR = { error: { code: 404, message: 'Product not found' } };
      sinon.stub(productsModel, 'findByProductId').resolves(undefined);
      const response = await productsService.findByProductId(PRODUCT_ID);
      expect(response).to.be.deep.equal(ERROR);
    });
  });
  describe('#createProduct', () => {
    const NAME = "Ms. Marvel";
    const PRODUCT = {
      id: 4,
      name: NAME,
    }
    beforeEach(() => {
      sinon.restore();
    });
    it('Cria e retorna produto criado.', async () => {
      sinon.stub(productsModel, 'createProduct').resolves(PRODUCT);
      const response = await productsService.createProduct(NAME);
      expect(response).to.be.deep.equal(PRODUCT);
    });
  });
});