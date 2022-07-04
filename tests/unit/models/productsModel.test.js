const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/database');
const productsModel = require('../../../models/productsModel');

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
      const response = await productsModel.getAllProducts();
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
      const response = await productsModel.findByProductId(PRODUCT_ID);
      expect(response).to.be.deep.eq(PRODUCT[0]);
    })
  });
  describe('#createProduct', () => {
    const EXPECTE_ID = 4;
    const NAME = "Ms. Marvel";
    beforeEach(() => {
      sinon.restore();
    });
    it('Cria e retorna produto criado.', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: EXPECTE_ID }]);
      const response = await productsModel.createProduct(NAME);
      expect(response).to.be.deep.equal({ id: EXPECTE_ID, name: NAME });
    });
  });
  describe('#updateProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Atualiza o nome de um produto.', async () => {
      const PRODUCT_INFO = { affectedRows: 1, productInfo: { id: 1, name: 'Martelo do Batman' } };
      const PRODUCT_ID = 1;
      const NAME = 'Martelo do Batman'
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
      const response = await productsModel.updateProduct(PRODUCT_ID, NAME);
      expect(response).to.be.deep.equal(PRODUCT_INFO);
    });
  });
  describe('#deleteProduct', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Deleta um produto.', async () => {
      const DELETE_INFO = 1;
      const PRODUCT_ID = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: DELETE_INFO }]);
      const response = await productsModel.deleteProduct(PRODUCT_ID);
      expect(response).to.be.equal(PRODUCT_ID);
    });
  });
  describe('#searchProducts', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Retorna uma produto da lista.', async () => {
      const SEARCH = 'mar';
      const RETURN_SEARCH = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(connection, 'execute').resolves([RETURN_SEARCH]);
      const response = await productsModel.searchProducts(SEARCH);
      expect(response).to.be.deep.equal(RETURN_SEARCH);
    });
    it('Retorna todos os produtos da lista, caso a busca estiver vazia.', async () => {
      const SEARCH = '';
      const RETURN_SEARCH = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }
      ];
      sinon.stub(connection, 'execute').resolves([RETURN_SEARCH])
      const response = await productsModel.searchProducts(SEARCH);
      expect(response).to.be.deep.equal(RETURN_SEARCH);
    });
  });
});