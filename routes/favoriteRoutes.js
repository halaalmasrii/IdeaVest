const express = require('express');
const favoriteController = require('../controller/favoriteController');
const router = express.Router();
const isAuth = require("../middlewares/authMiddleware")

router.post('/:userId',isAuth, favoriteController.createFavoriteOpportunity);
router.get('/:userId',isAuth, favoriteController.getFavoriteList);
router.delete('/userId/favorite/:opportunityId',isAuth, favoriteController.DeleteFavoriteOpportunity);

module.exports = router; 