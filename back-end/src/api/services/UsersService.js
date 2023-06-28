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

const inDatabaseValidation = async (name, email) => {
  const user = await User.findOne({
    where: { 
      [Op.or]: [{ name }, { email }],
    },
  });
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    raw: true,
  });

  if (user) {
    validateEncryption(md5(password), user.password);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }
};

const register = async (name, email, password) => {
  const user = await inDatabaseValidation(name, email);
  if (user) return -1;

  const passwordEncrypted = md5(password);
  const createdUser = await User.create({
    name,
    email,
    password: passwordEncrypted,
    role: 'customer',
  });

  const plainUser = createdUser.get({ plain: true });
  return { id: plainUser.id, name: plainUser.name, email: plainUser.email, role: plainUser.role };
};

const getSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    raw: true,
    attributes: { exclude: ['password'] },
  });
  return sellers;
};

const registerByAdmin = async (name, email, password, role) => {
  const user = await inDatabaseValidation(name, email);
  if (user) return -1;

  const passwordEncrypted = md5(password);
  const createdUser = await User.create({
    name,
    email,
    password: passwordEncrypted,
    role,
  });
  return createdUser.get({ plain: true });
};

const getUsersToManage = async () => {
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { role: 'customer' },
        { role: 'seller' },
      ],
    },
    raw: true,
  });
  return users;
};

const getUser = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  login,
  register,
  getSellers,
  registerByAdmin,
  getUsersToManage,
  getUser,
  deleteUser,
};