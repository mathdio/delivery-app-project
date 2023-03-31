const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const usersService = require('../services/UsersService');

const secret = fs.readFileSync('jwt.evaluation.key');

const validateLogin = (user) => {
 const payload = { name: user.name, email: user.email, role: user.role };
 const token = jwt.sign(payload, secret);
 return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.login(email, password);
  if (!user) return res.status(404).json({ message: 'Not Found' });
  const token = validateLogin(user);
  return res.status(200).json({ ...user, token });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersService.register(name, email, password);
  if (user === -1) return res.status(409).json({ message: 'Name or e-mail conflict' });
  const token = validateLogin(user);
  return res.status(201).json({ ...user, token });
};

module.exports = {
  login,
  register,
};