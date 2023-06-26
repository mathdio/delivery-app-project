const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { loginInputMock, 
  userMock, 
  createdRegisterMock, 
  registerInputMock, 
  sellersMock } = require('./mocks/Users.mock');
const usersService = require('../../api/services/UsersService');
const app = require('../../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('/users routes tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('successful login', async function () {
    sinon.stub(usersService, 'login').resolves(userMock);
    
    const response = await chai.request(app).post('/users/login').send(loginInputMock);
    expect(response.status).to.be.eq(200);
  });

  it('failed login', async function () {
    sinon.stub(usersService, 'login').resolves(null);

    const response = await chai.request(app).post('/users/login').send(loginInputMock);
    expect(response.status).to.be.eq(404);
    expect(response.body).to.deep.eq({ message: 'Not Found' });
  });

  it('successful register', async function () {
    sinon.stub(usersService, 'register').resolves(createdRegisterMock);

    const response = await chai.request(app).post('/users/register').send(registerInputMock);
    expect(response.status).to.be.eq(201);
  });

  it('failed register', async function () {
    sinon.stub(usersService, 'register').resolves(-1);

    const response = await chai.request(app).post('/users/register').send(registerInputMock);
    expect(response.status).to.be.eq(409);
    expect(response.body).to.deep.eq({ message: 'Name or e-mail conflict' });
  });

  it('successful sellers request', async function () {
    sinon.stub(usersService, 'getSellers').resolves(sellersMock);

    const response = await chai.request(app).get('/users/sellers');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(sellersMock);
  });
});