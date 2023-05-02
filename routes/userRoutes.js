const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require('../controllers/userControllers');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
