const express = require('express');
const router = express.Router();
const opportunityController = require('../controller/opportunityController');
const isAuth = require("../middlewares/authMiddleware")

router.post('/', isAuth, opportunityController.createOpportunity);
router.get('/' , isAuth, opportunityController.getOpportunity);
router.get('/:role' ,isAuth, opportunityController.getOpportunity);
router.get('/user/:userId' ,isAuth, opportunityController.getOpportunityByUser);
router.put('/:id',isAuth, opportunityController.updateOpportunity);
router.delete('/:id',isAuth, opportunityController.softDeleteOpportunity);

module.exports = router;
