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
});
