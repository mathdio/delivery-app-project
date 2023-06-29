const invalidName = 'Tom';
const invalidEmail = 'invalid@email.';
const invalidPassword = '123';
const responseRegisterMock = {
  id: 3,
  name: 'Test Customer',
  email: 'test@email.com',
  role: 'customer',
  token: 'tokenMock',
};
module.exports = {
  invalidName,
  invalidEmail,
  invalidPassword,
  responseRegisterMock,
};
