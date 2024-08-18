const express = require('express');
const userController= require('../controller/userController');
const { body } = require('express-validator');
const isAuth = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware'); 
const router = express.Router();

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('phoneNumber').isMobilePhone()
], userController.createUser);

router.post('/login', userController.loginUser);
router.get('/user/:id',isAuth , userController.getUser);
router.put('/user/:id' , isAuth , userController.updateUserProfile);
router.put('/user/image/:id', isAuth , userController.updateUserImage)
router.put('/user/cv/:id' , isAuth , userController.updateCv)


//router.route('/profile').post(protect, userController.updateUserProfile);
//router.put('/user/:id/profile-image', isAuth, upload.single('profileImage'), userController.uploadProfileImage);
//router.put('/user/:id/cv', isAuth, upload.single('cv'), userController.uploadCV);
//router.post('/test',userController.test)

module.exports = router;