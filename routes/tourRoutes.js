const express = require(`express`);
const tourController = require('E:/PERSONAL/avi folder/NODE.js/complete-node-bootcamp-master/4-natours/starter/controllers/tourControllers.js');

const router = express.Router();
//router.param("id",tourController.checkId);
router
  .route('/top-5-cheap')
  .get(tourController.top_5_cheap, tourController.getAllTours);
router.route('/getTourStats').get(tourController.Tour_Stats);
router.route('/getMonthlyPlan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

//router.route('/getTourStats').get(tourController.Tour_Stats);

module.exports = router;
