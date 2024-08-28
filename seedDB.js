const mongoose = require("mongoose");
const Question = require("./models/question"); // تأكد من المسار الصحيح

const questions = [
  {
    questionText: "حدد هدفك ؟",
    options: [
      "البحث عن فرصة لفكرة مشروع",
      "البحث عن فرصة لاستثمار مشروع"
    ],
  },
  {
    questionText: "ما مجال الفرصة المهتم بها ؟",
    options: [
      "ترفيه", 
      "تجارة", 
      "صحة و جمال", 
      "ثقافة و تعليم", 
      "مأكولات", 
      "خدمات عامة", 
      "تكنولوجيا"
    ],
  },
  {
    questionText: "ما هدف الفرصة المهتم بها ؟",
    options: [
      "ربحي", 
      "غير ربحي", 
      "مشترك", 
      "تطوعي"
    ],
  },
  {
    questionText: "حدد عنوان إنشاء مشروع الفرصة المهتم بها ؟",
    options: [
      "دمشق", 
      "ريف دمشق", 
      "درعا", 
      "حلب"
    ],
  },
  {
    questionText: "كم مبلغ الفرصة المطلوب/ المرغوب ؟",
    options: [
      "من 1.000$ إلى 5.000$", 
      "من 5.000$ إلى 10.000$", 
      "أكثر من 10.000$"
    ],
  }
];

const seedDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/IdeaVest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Question.deleteMany({}); // حذف الأسئلة السابقة إذا كان هناك

  for (const question of questions) {
    await new Question(question).save();
  }

  console.log("Database seeded with questions!");
  mongoose.connection.close();
};

seedDB();
