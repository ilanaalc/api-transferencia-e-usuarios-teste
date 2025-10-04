const request = require('supertest');
//const app = require('../../pgats-02-api/app.js');
const { expect } = require('chai');
require('dotenv').config();

//adicionar novo describe
describe('Registro de Usuário', () => {
  describe('POST /users/register', () => {
    it('Deve registrar um novo usuário com sucesso', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/users/register')
        .send({
          username: 'lima3',
          password: '123456',
          favorecidos: ['mateus', 'joão']
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('username');
      expect(response.body).to.have.property('saldo');
      expect(response.body).to.have.property('favorecidos');
      expect(response.body.username).to.equal('lima3');
      expect(response.body.saldo).to.equal(10000);
      expect(response.body.favorecidos).to.deep.equal(['mateus', 'joão']);
    });

    it('Deve retornar erro se faltar campo obrigatório', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/users/register')
        .send({
          username: 'lima'
          // sem password
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Usuário e senha obrigatórios');
    });
  });
});
