const loginInputMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const userMock = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
};

const registerInputMock = {
  name: 'Cliente Zé Teste',
  email: 'zeteste@email.com',
  password: '12345679',
};

const createdRegisterMock = {
  name: 'Cliente Zé Teste',
  email: 'zeteste@email.com',
  role: 'customer',
};

const sellersMock = [{
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  }];

module.exports = {
  loginInputMock, 
  userMock,
  registerInputMock,
  createdRegisterMock,
  sellersMock,
};