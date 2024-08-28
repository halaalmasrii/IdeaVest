const express = require('express');
const router = express.Router();

const adminRoutes = require("../routes/adminRoutes");
app.use("/admin", adminRoutes); 

router.use('/users', require('./userRoutes'));
router.use('/complaint', require('./complaintRoutes'));
router.use('/complaint/ad', require('./adminComplaintRoutes'));



module.exports = router;
