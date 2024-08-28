const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const cors = require("cors");
const multer = require('multer');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const adminComplaintRoutes = require('./routes/adminComplaintRoutes');
const adminRoutes = require("./routes/adminRoutes");
const transactionRoutes=require("./routes/transactionRoutes");
const recommendationRoutes = require('./routes/recommendationRoutes'); 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

app.use(multer({
  storage:storage}).fields(
    [{name:'image'},{name:'cv'}]
  ));

// app.use( cors({
//     origin: "http://localhost:3001", 
//   })
// );

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('MongoDB connection error: ', error);
});

app.use('/api/transaction',transactionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/acomplaint', adminComplaintRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/opportunity', opportunityRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


