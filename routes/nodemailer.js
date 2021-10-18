const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');


router.post('/send-email', (req, res, next) => {
    let { name, lastname, email, telephone, description, project,type } = req.body;


    console.log(`${name} ${lastname} ${email} ${telephone} ${description} ${project} ${type}`);
   
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'loganpaul8075@gmail.com',
          pass: 'logan@entrpnr'
        }
      });
      transporter.sendMail({
        from: '"onderwerp " <logan@project.com>',
        to: email, 
        subject: type, 
        text: project,
        html: `Bedankt ${lastname}, 
        <br> Wij hebben jouw email ontvangen.
        <br>Deze is behandeled met nummer. 
        <br><br>
        fijne dag
        <br>
        met vriendelijke groet
        <br> Client support   `
      })
      .then(info =>      res.status(200).json({ message: 'email is recieved' })
      )
      .catch(error => console.log(error));

     

  });

 
  
module.exports = router;
