const express = require('express');
const userOpportunityController = require('../controller/userOpportunityController');
const router = express.Router();
const isAuth = require("../middlewares/authMiddleware")


router.post('/', isAuth, userOpportunityController.createUserOpportunity);
router.delete('/', isAuth, userOpportunityController.removeFromAvailableOpportunities);


module.exports = router;
