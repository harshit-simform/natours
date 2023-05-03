const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require('../controllers/userControllers');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authControllers');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
