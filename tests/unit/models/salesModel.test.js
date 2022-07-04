const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/database');
const salesModel = require('../../../models/salesModel');

describe('#salesModel', () => {
  describe('#createSales', () => {
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
    const DETAILS_SALES = {
      id: 4,
      itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
    }
    const EXPECTE_ID = 4;
    beforeEach(() => {
      sinon.restore();
    });
    it('Cria uma venda.', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: EXPECTE_ID }]);
      const response = await salesModel.createSales(SALES);
      expect(response).to.be.deep.equal(DETAILS_SALES)
    });
  })
  describe('#getAllSales', () => {
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
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorno um lista de vendas.', async () => {
      sinon.stub(connection, 'execute').resolves([SALES]);
      const response = await salesModel.getAllSales();
      expect(response).to.be.equal(SALES);
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
      sinon.stub(connection, 'execute').resolves([SALE])
      const response = await salesModel.findBySaleId(SALE_ID);
      expect(response).to.be.equal(SALE);
    });
  });
  describe('#deleteSale', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Deletando venda usando ID da mesma.', async () => {
      const SALE_ID = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);
      const response = await salesModel.deleteSale(SALE_ID);
      expect(response).to.be.equal(undefined);
    });
  });
  describe('#updateSale', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Atualiza uma venda usando ID da mesma.', async () => {
      const SALE_ID = 1
      const SALE_UPDATE = [
        { "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ];
      const SALE_DATABASE = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 2
        }
      ];
      sinon.stub(connection, 'execute').resolves();
      const response = await salesModel.updateSale(SALE_ID, SALE_UPDATE, SALE_DATABASE);
      expect(response).to.be.deep.equal({ saleId: SALE_ID, itemsUpdated: SALE_UPDATE })
    });
  });
});