const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');

const validateEncryption = (password, passwordDb) => {
  if (password !== passwordDb) {
    const error = new Error('Invalid email or password');
    error.name = 'UNAUTHORIZED';
    throw error;
  }
};

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    raw: true,
  });

  if (user) {
    validateEncryption(md5(password), user.password);
  }

  return user;
};

const register = async (name, email, password) => {
  const user = await User.findOne({
    where: { 
      [Op.or]: [{ name }, { email }],
    },
  });
  if (user) return -1;

  const passwordEncrypted = md5(password);
  const createdUser = await User.create({
    name,
    email,
    password: passwordEncrypted,
    role: 'customer',
  });
  return createdUser.get({ plain: true });
};

const getSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    raw: true,
  });
  return sellers;
};

module.exports = {
  login,
  register,
  getSellers,
};