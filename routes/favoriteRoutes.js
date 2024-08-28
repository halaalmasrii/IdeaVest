const express = require('express');
const favoriteController = require('../controller/favoriteController');
const router = express.Router();
const isAuth = require("../middlewares/authMiddleware")

router.post('/:opportunityId',isAuth, favoriteController.createFavoriteOpportunity);
router.get('/',isAuth, favoriteController.getFavoriteList);
router.delete('/:opportunityId',isAuth, favoriteController.DeleteFavoriteOpportunity);

module.exports = router; 