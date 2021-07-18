const express = require("express");
const router = express.Router();
const checkAuth = require('../Middlewares/CheckAuth');
const healthControllers = require('../Controllers/Health');

router.post("/healthTips",checkAuth,healthControllers.health_tips );

module.exports = router;