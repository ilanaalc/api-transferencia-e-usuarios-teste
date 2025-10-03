const request = require('supertest');
const app = require('../../pgats-02-api/app.js');
const { expect } = require('chai');

describe('Registro de Usuário', () => {
  it('Deve registrar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        username: 'luciana',
        password: '123456',
        favorecidos: ['mateus', 'joão']
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('username');
    expect(response.body).to.have.property('saldo');
    expect(response.body).to.have.property('favorecidos');
    expect(response.body.username).to.equal('luciana');
    expect(response.body.saldo).to.equal(10000);
    expect(response.body.favorecidos).to.deep.equal(['mateus', 'joão']);
  });

  it('Deve retornar erro se faltar campo obrigatório', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        username: 'luciana'
        // sem password
      });

    expect(response.status).to.equal(400);
  });
});
