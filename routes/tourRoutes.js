const express = require('express');
const { protect, restrictTo } = require('../controllers/authControllers');
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/tours-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .delete(protect, restrictTo('admin'), deleteTour)
  .patch(updateTour);

module.exports = router;
