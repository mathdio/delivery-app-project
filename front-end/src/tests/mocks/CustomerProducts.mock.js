const loginEmail = 'zebirita@email.com';
const loginPassword = '123456';
const responseLoginMock = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
  token: 'tokenMock',
};
const productsMock = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

module.exports = {
  loginEmail,
  loginPassword,
  responseLoginMock,
  productsMock,
};
