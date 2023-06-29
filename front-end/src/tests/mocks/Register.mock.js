const invalidName = 'Tom';
const invalidEmail = 'invalid@email.';
const invalidPassword = '123';
const validName = 'Test Customer';
const validEmail = 'test@email.com';
const validPassword = '123456';
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
  validName,
  validEmail,
  validPassword,
};
