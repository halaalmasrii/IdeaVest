const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaintController');
const isAuth = require("../middlewares/authMiddleware")

router.post('/', isAuth, complaintController.createComplaint);

module.exports = router;