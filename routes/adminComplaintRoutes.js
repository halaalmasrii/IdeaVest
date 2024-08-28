const express = require('express');
const router = express.Router();
const adminComplaintController = require('../controller/adminComplaintController');
const isAuth = require("../middlewares/authMiddleware")

router.get('/' , isAuth, adminComplaintController.getComplaint);
router.get('/user/:userId' ,isAuth, adminComplaintController.getComplaintByUser);
router.get('/user/replay/:complaintId' ,isAuth, adminComplaintController.replayComplaintByEmail);


module.exports = router;

