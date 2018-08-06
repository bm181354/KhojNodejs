const
    config = require("../config/config"),
    errors = require("../controllers/errorController"),
    nodemailer = require("nodemailer"),
    emailAddress = config.EMAIL_ADDRESS,
    emailPassword = config.EMAIL_PASSWORD;


// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: emailAddress,
//     pass: emailPassword
//   }
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: emailAddress,
        pass: emailPassword
    }
});

var mailOptions = {
  from: emailAddress,
  to: 'm.biken@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

exports.sendEmail = (toEmail) =>{
  return new Promise((resolve,reject)=>{

    // change mailOption here
    try{
        mailOptions.to = toEmail
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            reject(errors.cannotSendEmail);
          } else {
            console.log('Email sent: ' + info.response);
            resolve();
          }
        })
    }catch(err){
      reject(errors.cannotSendEmail)
    }

  });
}
