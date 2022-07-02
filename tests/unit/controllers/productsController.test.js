const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('#productsController', () => {
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
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'getAllProducts').resolves(LIST);

      await productsController.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(LIST)).to.be.equal(true);
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
      const req = {};
      const res = {};

      const PRODUCT_ID = 1;

      req.params = PRODUCT_ID;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'findByProductId').resolves(PRODUCT);

      await productsController.findByProductId(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });
    it('Retorna um erro com ID inválido.', async () => {
      const req = {};
      const res = {};

      const PRODUCT_ID = 1001;

      req.params = PRODUCT_ID;

      const ERROR = { error: { code: 404, message: 'Product not found' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'findByProductId').resolves(ERROR);

      await productsController.findByProductId(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
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
      const req = {};
      const res = {};

      req.body = { name: NAME };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'createProduct').resolves(PRODUCT);
      await productsController.createProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });
  });
  describe('#updateProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Atualiza o nome de um produto.', async () => {
      const req = {};
      const res = {};

      const PRODUCT_ID = 1;
      const NAME = 'Martelo do Batman';
      const PRODUCT = { id: PRODUCT_ID, name: NAME }

      req.params = { id: PRODUCT_ID };
      req.body = { name: NAME };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'updateProduct').resolves(PRODUCT);
      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(PRODUCT)).to.be.equal(true);
    });
    it('Retorno error quando o ID for inválido.', async () => {
      const req = {};
      const res = {};

      const PRODUCT_ID = 1001;
      const NAME = 'Martelo do Batman';
      const ERROR = { error: { code: 404, message: 'Product not found' } };

      req.params = { id: PRODUCT_ID };
      req.body = { name: NAME };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'updateProduct').resolves(ERROR);
      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
  describe('#deleteProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Deleta um produto.', async () => {
      const req = {};
      const res = {};

      const PRODUCT_ID = 1;

      req.params = { id: PRODUCT_ID };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub();

      sinon.stub(productsService, 'deleteProduct').resolves(undefined);
      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
    it('Retorno error quando o ID for inválido.', async () => {
      const req = {};
      const res = {};

      const PRODUCT_ID = 1001;
      const ERROR = { error: { code: 404, message: 'Product not found' } };

      req.params = { id: PRODUCT_ID };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'deleteProduct').resolves(ERROR);
      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});
