const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");
const isAuth = require("../middlewares/authMiddleware")


router.post("/:opportunityId",isAuth, transactionController.createTransaction);

module.exports = router;
