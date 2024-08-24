const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController');

const isAuth = require("../middlewares/authMiddleware");


router.post('/login', adminController.loginAdmin);

router.get("/users", adminController.getUser);

router.patch("/users/:id/block", adminController.blockUser);

router.get("/opportunities", adminController.getOpportunity);

router.delete("/opportunities/:id", adminController.softDeleteOpportunity);

router.get("/user/:userId", isAuth, adminController.getOpportunityByUser);

module.exports = router;
