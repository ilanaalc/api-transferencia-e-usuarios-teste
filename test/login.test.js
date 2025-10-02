const request = require('supertest');
const app = require('../app.js');
const { expect } = require('chai');

describe('Login de Usuário', () => {
  beforeEach(async () => {
    // Registra o usuário antes de cada teste
    await request(app)
      .post('/users/register')
      .send({
        username: 'luciana',
        password: '123456',
        favorecidos: ['mateus', 'joão']
      });
  });

  it('Deve realizar login com sucesso e retornar token', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        username: 'luciana',
        password: '123456'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Deve falhar ao tentar login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        username: 'luciana',
        password: 'senhaErrada'
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
  });
});
