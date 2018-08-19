const
    config = require("../config/config"),
    errors = require("../controllers/errorController"),
    nodemailer = require("nodemailer"),
    authModel = require("../models/auth"),
    emailAddress = config.EMAIL_ADDRESS,
    emailPassword = config.EMAIL_PASSWORD;

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
  subject: 'Comfirm the email Notificaiton',
  text: 'That was easy!',
  html:'<b>CHECK</b>'
};

exports.sendEmail = (userRequest) =>{
  return new Promise((resolve,reject)=>{

    // change mailOption here
    try{
          console.log(userRequest)
          authModel.createEmailToken(userRequest).then((emailToken)=>{
              mailOptions.to = userRequest.email
              // mailOptions.text = 'This is your Token: <a href= "${emailToken}">' + emailToken +'<a>'
              mailOptions.html = 'This is your Token <a href= ' +`http://localhost:5012/`+ emailToken +">"+ "link." +'<a>'
              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                      console.log(error);
                      reject(errors.cannotSendEmail);
                  } else {
                      console.log('Email sent: ' + info.response);
                      resolve(info);
                  }
              })
        }).catch((err)=>{
             console.log(err)
             reject(errors.cannotSendEmail);
        })


    }catch(err){
      reject(errors.cannotSendEmail)
    }

  });
}
