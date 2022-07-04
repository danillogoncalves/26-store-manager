const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { expectationFailed } = require('@hapi/boom');

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
  describe('#getAllSales', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorno um lista de vendas.', async () => {
      const req = {};
      const res = {};

      const SALES = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'getAllSales').resolves(SALES);

      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALES)).to.be.equal(true);
    });
    it('Retorna a lista do ID de uma venda.', async () => {
      const req = {};
      const res = {};

      const SALE = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      const SALE_ID = 1;
      
      req.params = { id: SALE_ID };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'findBySaleId').resolves(SALE);

      await salesController.findBySaleId(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(SALE)).to.be.equal(true);
    });
    it('Retorna a undefined com ID inválido.', async () => {
      const req = {};
      const res = {};

      const SALE_ERROR = { error: { code: 404, message: 'Sale not found' } };

      const SALE_ID = 1001;

      req.params = { id: SALE_ID };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'findBySaleId').resolves(SALE_ERROR);

      await salesController.findBySaleId(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });
  describe('#deleteSale', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Deletando venda usando ID da mesma.', async () => {
      const req = {};
      const res = {};

      const SALE_ID = 1;

      req.params = { id: SALE_ID };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub();

      sinon.stub(salesService, 'deleteSale').resolves(undefined);
      await salesController.deleteSale(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
    it('Quando o ID da venda é inválido.', async () => {
      const req = {};
      const res = {};

      const SALE_ID = 1;
      const RETURN_ERROR = { error: { code: 404, message: 'Sale not found' } };

      req.params = { id: SALE_ID };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'deleteSale').resolves(RETURN_ERROR);
      await salesController.deleteSale(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });
  describe('#updateSale', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Atualiza uma venda usando ID da mesma.', async () => {
      const req = {};
      const res = {};

      const SALE_ID = 1;
      const SALE_UPDATE = [
        { "productId": 1, "quantity": 10 },
        { "productId": 2, "quantity": 50 }
      ];
      const RETURN_SALE_UPDATE = {
        "saleId": 1, "itemsUpdated":
          [
            { "productId": 1, "quantity": 10 },
            { "productId": 2, "quantity": 50 }
          ]
      };
      req.params = { id: SALE_ID };
      req.body = SALE_UPDATE;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'updateSale').resolves(RETURN_SALE_UPDATE);
      await salesController.updateSale(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(RETURN_SALE_UPDATE)).to.be.equal(true);
    });
    it('Retorna um erro quando o ID da venda for inválido.', async () => {
      const req = {};
      const res = {};

      const SALE_INCORRECT_ID = 1001;
      const SALE_UPDATE = [
        { "productId": 1, "quantity": 10 },
        { "productId": 2, "quantity": 50 }
      ];
      const ERROR = { error: { code: 404, message: 'Sale not found' } };
      req.params = { id: SALE_INCORRECT_ID };
      req.body = SALE_UPDATE;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'updateSale').resolves(ERROR);
      await salesController.updateSale(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
    it('Retorna um erro quando o ID do produto for inválido.', async () => {
      const req = {};
      const res = {};

      const SALE_ID = 1;
      const SALE_INCORRECT_UPDATE = [
        { "productId": 8, "quantity": 10 },
        { "productId": 2, "quantity": 50 }
      ];
      const ERROR = { error: { code: 404, message: 'Product not found' } };
      req.params = { id: SALE_ID };
      req.body = SALE_INCORRECT_UPDATE;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'updateSale').resolves(ERROR);
      await salesController.updateSale(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});