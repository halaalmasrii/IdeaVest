const express = require('express');
const recommendationController = require('../controller/recommendationController'); // تأكد من أن المسار صحيح
const router = express.Router();

// الحصول على الأسئلة
router.get('/questions', recommendationController.getQuestions);

// حفظ ردود المستخدمين
router.post('/responses', recommendationController.saveUserResponse);

module.exports = router;

