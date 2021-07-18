const express = require("express");
const router = express.Router();
const checkAuth = require('../Middlewares/CheckAuth');
const workoutControllers = require('../Controllers/Workout');

router.post("/allWorkouts",checkAuth,workoutControllers.all_workouts );

router.post("/specific_workout",checkAuth,workoutControllers.specific_workout);

module.exports = router;