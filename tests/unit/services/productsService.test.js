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
  describe('#updateProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Atualiza o nome de um produto.', async () => {
      const PRODUCT_INFO = { affectedRows: 1, productInfo: { id: 1, name: 'Martelo do Batman' } };
      const PRODUCT_ID = 1;
      const NAME = 'Martelo do Batman';
      sinon.stub(productsModel, 'updateProduct').resolves(PRODUCT_INFO);
      const response = await productsService.updateProduct(PRODUCT_ID, NAME);
      expect(response).to.be.deep.equal({ id: 1, name: 'Martelo do Batman' });
    });
    it('Retorno error quando o ID for inválido.', async () => {
      const PRODUCT_INFO = { affectedRows: 0, productInfo: { id: 1001, name: 'Martelo do Batman' } };
      const ERROR_INFO = { error: { code: 404, message: 'Product not found' } };
      const PRODUCT_ID = 1001;
      const NAME = 'Martelo do Batman';
      sinon.stub(productsModel, 'updateProduct').resolves(PRODUCT_INFO);
      const response = await productsService.updateProduct(PRODUCT_ID, NAME);
      expect(response).to.be.deep.equal(ERROR_INFO);
    });
  });
  describe('#deleteProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorno error quando o ID for inválido.', async () => {
      const ERROR_INFO = 0;
      const PRODUCT_ID = 1001;
      const ERROR_RETURN = { error: { code: 404, message: 'Product not found' } }
      sinon.stub(productsModel, 'deleteProduct').resolves(ERROR_INFO);
      const response = await productsService.deleteProduct(PRODUCT_ID);
      expect(response).to.be.deep.equal(ERROR_RETURN);
    });
  });
});