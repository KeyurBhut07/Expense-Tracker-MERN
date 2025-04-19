const express = require('express');
const routes = express.Router();
const authControllers = require('../controllers/auth');
const { isAuthenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

routes.post('/register', authControllers.register);

routes.post('/login', authControllers.login);

routes.get('/getUser', isAuthenticate, authControllers.getUserInfo);

routes.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = routes;
