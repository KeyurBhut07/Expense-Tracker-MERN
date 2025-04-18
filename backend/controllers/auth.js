const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

// Genrate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const register = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await Users.create({
      name,
      email,
      password,
      profileImageUrl,
    });

    const token = generateToken(user._id);
    res.status(201).json({ id: user._id, user, token });
  } catch (error) {
    res.status(500).json({
      message: 'Error registring user',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not registered' });
    }
    const isValidPassword = await user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = generateToken(user._id);
    res.status(200).json({ id: user._id, user, token });
  } catch (error) {
    res.status(500).json({
      message: 'Error login user',
      error: error.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error in user get',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
};
