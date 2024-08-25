const Complaint = require("../models/complaint");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const getComplaint = async (req, res) => {
  const co = await Complaint.find().populate("complainterId");
  return res.status(200).json({ co });
};

const getComplaintByUser = async (req, res) => {
  let userId = req.params.userId;

  let complaint = await Complaint.find().populate("complainterId");

  const filteredCo = complaint.filter((co) => {
    return co.complainterId._id.toString() === userId;
  });
  res.status(200).json({ filteredCo });
};

const replayComplaintByEmail = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await Complaint.findById(complaintId);

    const accusedEmail = complaint.accused; // استخدام حقل accused كعنوان البريد الإلكتروني

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER, //"hala.almasri.s.2002@gmail.com", 
        pass: process.env.APP_PASSWORD, //"waaf tsmf wbyf wdeg",
      },
    });

    let mailOptions = {
      from: '"Idea Vest" <' + process.env.USER + '>',//' "Idea Vest" <hala.almasri.s.2002@gmail.com>', 
      to: accusedEmail,
      subject: "Complaint Notification", // Subject line
      text: "We have received a complaint about you. We would be glad to meet at our office.", // plain text body
      html: "<p>We have received a complaint about you. We would be glad to meet at our office.</p>", // html body
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Email sent successfully to " + accusedEmail });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getComplaint,
  getComplaintByUser,
  replayComplaintByEmail,
};
