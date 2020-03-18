var nodemailer = require('nodemailer');
const sendMail = (to,subject,html) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nguyentuanvu.kc21@gmail.com',
    pass: 'Vukind123'
  }
});

var mailOptions = {
  from: 'nguyentuanvu.kc21@gmail.com',
  to: to,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ');
  }
})
}

module.exports = sendMail;