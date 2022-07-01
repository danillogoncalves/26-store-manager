const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');

describe('#salesService', () => {
  describe('#createSales', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Cria uma venda', async () => {
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
      const LIST = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];
      sinon.stub(productsModel, 'getAllProducts').resolves(LIST);
      sinon.stub(salesModel, 'createSales').resolves(DETAILS_SALES);
      const response = await salesService.createSales(SALES);
      expect(response).to.be.equal(DETAILS_SALES);
    });
    it('Venda um ID do produto inválido.', async () => {
      const LIST = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];
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
      const ERROR = { error: { code: 404, message: 'Product not found' } };
      sinon.stub(productsModel, 'getAllProducts').resolves(LIST);
      const response = await salesService.createSales(SALES_ERROR);
      expect(response).to.be.deep.equal(ERROR);
    });
  });
  describe('#getAllSales', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorno um lista de vendas.', async () => {
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
      ]
      sinon.stub(salesModel, 'getAllSales').resolves(SALES);
      const response = await salesService.getAllSales();
      expect(response).to.be.deep.equal(SALES);
    });
  });
  describe('#findBySaleId', () => {
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
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna a lista do ID de uma venda.', async () => {
      const SALE_ID = 1;
      sinon.stub(salesModel, 'findBySaleId').resolves(SALE);
      const response = await salesService.findBySaleId(SALE_ID);
      expect(response).to.be.equal(SALE);
    });
    it('Retorna a undefined com ID inválido.', async () => {
      const SALE_ID = 1001;
      sinon.stub(salesModel, 'findBySaleId').resolves([]);
      const response = await salesService.findBySaleId(SALE_ID);
      expect(response[0]).to.be.equal(undefined);
    });
  });
});