nodemailer = require('nodemailer');
const request = require('request');
const { db_Select } = require('./MasterModule');

const getUser = () => {
    return new Promise(async (resolve, reject) => {
        var select = "id,email_id,u_name,profile_id",
        table_name = "td_user_profile",
        whr = null,
        order = null;
        var res_dt = await db_Select(select,table_name,whr,order);
        resolve(res_dt);
    })
}

const SendUserEmail = (emailId,profilelId,userName, note) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
        user: 'AKIAZBYUUR636YJISSUT',
        pass: 'BKBR0FJZfKUHOyEOLBMwaa99XBybd07/v2Ik8IFRbxLU'
       },
        tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true
    }
        });
        const mailOptions = {
            from: 'info@mysoulmate.co.in',
            to: `${emailId}`,
            // to: `subham@synergicsoftek.in,suvrajit@synergicsoftek.com`,
            subject: 'Important Email',
            html: `<!DOCTYPE html>
            <head>
            <meta charset="utf-8">
            <title>Index</title>
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> 
                
            </head>
            <style>
                body {
              font-family: 'Roboto', sans-serif;
             font-size: 14px; /* line-height: 18px;*/
              color: #344161;
              background: #f6f8f9;
              margin: 0;
              padding: 0;
              line-height: normal; 
              min-height: 100%;
              display: flex;
              flex-direction: column;
            }
            
            html{height: 100%;}
            
            
            h1, h2, h3, h4, h5, h6, ul, ol, li, form, input, select, div, textarea {
              padding: 0;
              margin: 0
            }
            img {
              border: none;
              max-width: 100%;
              height: auto
            }
            .clear {
              margin: 0;
              padding: 0;
              clear: both
            }
            .after:after {
              content: "";
              display: block;
              clear: both;
              visibility: hidden
            }
            a {
              color: #05adff;
              text-decoration: none;
              padding: 0;
              margin: 0;
              outline: none;
              transition: all 0.3s;
              transition: all 500ms ease-in-out
            }
            a:hover {
              color: #456ad9;
              text-decoration: none
            }
            
            button{transition: all 0.3s;
              transition: all 500ms ease-in-out}
            
            img {
              max-width: 100%
            }
            
            </style>    
            
            <body>
            <div style="max-width: 808px; width: 100%; margin:35px auto 35px auto; border-radius: 50px; box-shadow: 0 0px 12px 2px #c6c5c5;">
            <div style="border-radius: 50px 50px 0 0; background: #fff; padding: 9px 15px; text-align: center; border-bottom: #d42c3d solid 8px;">
                <img src="https://mysoulmate.co.in/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
                
            <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
                <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${userName},</h2>
                <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">${note}</p>
                  
                <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">Thank you,<br>
                 My Soulmate Team</p>
            </div>
                
                <div style="border-radius0; background: #bd5f5f; padding: 9px 0; text-align: center;">
                    
                    <div style="border-bottom: #fff solid 1px; padding: 15px 15px">
            
                    <ul style="margin: 0; padding: 0; list-style-type: none;">
                        
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px;  color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">
                            Phone: <a href="tel:8276998997" style="color: #fff;"> 8276998997</a></li>
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px; color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">
                            Email: <a href="mailto:mysoulm297@gmail.com" style="color: #fff;">mysoulm297@gmail.com </a></li>
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px; color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">Follow Us 
                            <a href="https://www.youtube.com/shaambhaviastro?si=E42VMKrSDNPfoh1x" target="_blank" style="color: #fff;"> 
                                <img src="youtube.png" alt="" style="max-width: 19px; width: 100%; margin-bottom: -5px;" /></a></li>
                        </ul>
                  </div>
                    
                  <div style="padding: 15px 15px; color: #fff;">
                  Note: This is an auto generated mail, please do not reply to this mail
                    </div>
                
                </div>
            </div>
                
                
            
            </body>
            </html>`
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              resolve({suc:0, msg: error})
          } else {
              console.log('Email sent:', info.response);
              resolve({suc:1, msg: 'Email sent successfully'})
          }
      });  
    })
  };

  const ConfirmEmail = (emailId,userName) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
        user: 'AKIAZBYUUR636YJISSUT',
        pass: 'BKBR0FJZfKUHOyEOLBMwaa99XBybd07/v2Ik8IFRbxLU'
       },
        tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true
    }
        });
        const mailOptions = {
            from: 'info@mysoulmate.co.in',
            to: `${emailId}`,
            // to: `sayantika@synergicsoftek.in`,
            subject: 'Important Email',
            html: `<!DOCTYPE html>
            <head>
            <meta charset="utf-8">
            <title>Index</title>
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> 
                
            </head>
            <style>
                body {
              font-family: 'Roboto', sans-serif;
             font-size: 14px; /* line-height: 18px;*/
              color: #344161;
              background: #f6f8f9;
              margin: 0;
              padding: 0;
              line-height: normal; 
              min-height: 100%;
              display: flex;
              flex-direction: column;
            }
            
            html{height: 100%;}
            
            
            h1, h2, h3, h4, h5, h6, ul, ol, li, form, input, select, div, textarea {
              padding: 0;
              margin: 0
            }
            img {
              border: none;
              max-width: 100%;
              height: auto
            }
            .clear {
              margin: 0;
              padding: 0;
              clear: both
            }
            .after:after {
              content: "";
              display: block;
              clear: both;
              visibility: hidden
            }
            a {
              color: #05adff;
              text-decoration: none;
              padding: 0;
              margin: 0;
              outline: none;
              transition: all 0.3s;
              transition: all 500ms ease-in-out
            }
            a:hover {
              color: #456ad9;
              text-decoration: none
            }
            
            button{transition: all 0.3s;
              transition: all 500ms ease-in-out}
            
            img {
              max-width: 100%
            }
            
            </style>    
            
            <body>
            <div style="max-width: 808px; width: 100%; margin:35px auto 35px auto; border-radius: 50px; box-shadow: 0 0px 12px 2px #c6c5c5;">
            <div style="border-radius: 50px 50px 0 0; background: #fff; padding: 9px 15px; text-align: center; border-bottom: #d42c3d solid 8px;">
                <img src="https://mysoulmate.co.in/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
                
            <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
                <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${userName},</h2>
                <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">Congratulations! Your profile is live on our platform, and we're thrilled to welcome you to our community. From this moment forward, you have full access to our search list and many exclusive features designed to enhance your experience.
  
                We're excited to have you on board and can't wait to see your incredible journey through My Soul Mate. If you have any questions or need assistance, our support team is here to help.
                
                Thank you for choosing us to be a part of your journey. Happy exploring!</p>
                  
                <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">Thank you,<br>
                 My Soulmate Team</p>
            </div>
                
                <div style="border-radius0; background: #bd5f5f; padding: 9px 0; text-align: center;">
                    
                    <div style="border-bottom: #fff solid 1px; padding: 15px 15px">
            
                    <ul style="margin: 0; padding: 0; list-style-type: none;">
                        
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px;  color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">
                            Phone: <a href="tel:8276998997" style="color: #fff;"> 8276998997</a></li>
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px; color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">
                            Email: <a href="mailto:mysoulm297@gmail.com" style="color: #fff;">mysoulm297@gmail.com </a></li>
                        <li style="margin: 0 0 0 0; padding: 0 10px 0 10px; color: #fff; line-height: 16px; display: inline-block; border-right: #fff solid 1p">Follow Us 
                            <a href="https://www.youtube.com/shaambhaviastro?si=E42VMKrSDNPfoh1x" target="_blank" style="color: #fff;"> 
                                <img src="youtube.png" alt="" style="max-width: 19px; width: 100%; margin-bottom: -5px;" /></a></li>
                        </ul>
                  </div>
                    
                  <div style="padding: 15px 15px; color: #fff;">
                  Note: This is an auto generated mail, please do not reply to this mail
                    </div>
                
                </div>
            </div>
                
                
            
            </body>
            </html>`
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              resolve({suc:0, msg: error})
          } else {
              console.log('Email sent:', info.response);
              resolve({suc:1, msg: 'Email sent successfully'})
          }
      });  
    })
  }; 

module.exports = {getUser, SendUserEmail, ConfirmEmail}