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
});