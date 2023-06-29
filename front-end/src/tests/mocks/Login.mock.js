const invalidEmail = 'invalid@email.';
const invalidPassword = '123';
const unregisteredEmail = 'unregistered@email.com';
const validEmail = 'valid@email.com';
const validPassword = '123456';
const responseLoginMock = {
  id: 3,
  name: 'Valid Customer',
  email: 'valid@email.com',
  role: 'customer',
  token: 'tokenMock',
};

module.exports = {
  invalidEmail,
  invalidPassword,
  unregisteredEmail,
  validEmail,
  validPassword,
  responseLoginMock,
};
