const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const movieController = require('../controllers/moviesController')

router.get("/users/phone/:phoneNumber",controller.findByPhone)
router.get("/movies/:movieId/reviews",movieController.getTop3Reviews)

// post
router.post("/signup",controller.userSignup);
router.post('/login',controller.userLogin)
router.post("/user/changePassword",controller.changePassword );
router.post("/movies/:movieId/rating",movieController.addReviewFields)

// put
router.put("/update-profile-picture",controller.updateProfile);
router.put("/update-contact/:email",controller.updateContact)
module.exports = router;

