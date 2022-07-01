const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('#salesController', () => {
  describe('#createSales', () => {
    const DETAILS_SALES = {
      id: 4,
      itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
    };
    const SALES = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    beforeEach(() => {
      sinon.restore();
    });
    it('Cria uma venda', async () => {
      const req = {};
      const res = {};

      sinon.stub(salesService, 'createSales').resolves(DETAILS_SALES);

      req.body = SALES;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      const response = await salesController.createSales(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(DETAILS_SALES)).to.be.equal(true);
    });
    it('Venda um ID do produto inválido.', async () => {
      const req = {};
      const res = {};

      const SALES_ERROR = [
        {
          "productId": 8,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      req.body = SALES_ERROR;

      const ERROR = { error: { code: 404, message: 'Product not found' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'createSales').resolves(ERROR);

      await salesController.createSales(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});