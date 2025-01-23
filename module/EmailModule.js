const nodemailer = require('nodemailer');
const { Encrypt } = require('./MasterModule');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SNS_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SNS_USER,
    pass: process.env.SNS_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: true
  }
});

const server_url = 'https://mysoulmate.co.in'

const SendUserEmail = (emailId, profilelId, userName) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${emailId}`,
      subject: 'Registration Successful',
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
                <img src="${server_url}/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
                
            <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
                <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${userName},</h2>
                <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">Welcome aboard to My Soul Mate! Thank you for creating an account with us. Your profile ID is ${profilelId}. You can access your profile once it is activated by Admin.</p>
                
             
                <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">If you did not initiate this request, please contact with Mysoulmate .</p>
                
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
        resolve(error)
      } else {
        console.log('Email sent:', info.response);
        resolve(info)
      }
    });
  })
}

const SendVerifyEmail = (otp, emailId, profilelId, userName) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${emailId}`,
      subject: 'Verify Your Email',
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
              <img src="${server_url}/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
              
          <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
              <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${userName},</h2>
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">Your profile ID is ${profilelId}. Please use the verification code below to verify your email on the My Soulmate Website.</p>
              <h1 align="center" style= "font-size: 20px"><b>${otp}</b></h1><br>
               <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">If you did not initiate this request, You can ignore this email or let contact with Mysoulmate .</p>
              
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
        resolve({ suc: 0, msg: error })
      } else {
        console.log('Email sent:', info.response);
        resolve({ suc: 1, msg: 'Email send' })
      }
    });
  })
}


const sendLoginEmail = (otp, email_id, user_name) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${email_id}`,
      subject: 'Login OTP Successful',
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
              <img src="${server_url}/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
              
          <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
              <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${user_name},</h2>
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">${otp} is your OTP to access you account.OTP is valid for 5 minutes.For security reasons,DO NOT share this OTP with anyone.</p>
              
           
              <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">If you did not initiate this request, please contact with Mysoulmate .</p>
              
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
        resolve(error)
      } else {
        console.log('Email sent:', info.response);
        resolve(info)
      }
    });
  })
};

const ContactUserEmail = (id, profilelId, userName, frm_email, to_email) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${to_email}`,
      subject: `Invitation from ${userName} | My Soul Mate`,
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
              <img src="${server_url}/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
              
          <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
              <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Greetings,</h2>
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">I'm ${userName} (${profilelId}), and you can reach me at ${frm_email}. Your profile has caught my attention, and I would like to know more about you. Feel free to get in touch for further communication.</p>
              
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">To visit my profile click on this link: <a href="${server_url}/#/portfolio_view/${id}/M">View Profile</a></p>
           

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
        resolve({ suc: 0, msg: error })
      } else {
        console.log('Email sent:', info.response);
        resolve({ suc: 1, msg: 'Email sent successfully' })
      }
    });
  })
};

const SendForgetPwdEmail = (emailId, userName) => {
  console.log(emailId, userName);
  return new Promise(async (resolve, reject) => {
    // Get the current date and time
    var currentDate = new Date().toLocaleString();
    var encDate = await Encrypt(currentDate)

    var encEmail = await Encrypt(emailId)
    
    const resetLink = `${server_url}/#/forgetpassword/${encodeURIComponent(encEmail)}#${encodeURIComponent(encDate)}`

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${emailId}`,
      subject: 'Do you want to reset your Password?',
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
              <img src="${server_url}/assets/images/logo_new.png" alt="" style="max-width: 110px;" /></div>
              
          <div style="border-radius:0; background: #fff; padding:48px 15px; text-align: left; min-height: 450px; border-radius:0 0 50px 50px;">
              <h2 style="font-weight: 300; color: #344161; font-size: 17px; margin-bottom: 35px;">Dear ${userName},</h2>
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">We have received a request to reset the password for your Mysoulmate account.</p>
              
              <p style="font-size: 17px;  margin-bottom: 35px; margin-top: 0;  line-height: 32px;">You can reset the password by clicking the link below ${resetLink}</p>

           
              <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">If you didnot request to reset password,please let us know immediately by replying to this mail info@mysoulmate.co.in.</p>
              
              <p style="font-size: 17px; margin-bottom: 35px;  margin-top: 0; line-height: 32px;">Expire the link after 24 hrs.</p>

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
        console.log(error);
        console.error('Error sending email:', error);
        resolve({ suc: 0, msg: error })
      } else {
        console.log(info);
        console.log('Email sent:', info.response);
        resolve({ suc: 1, msg: 'Email sent successfully' })
      }
    });
  })
}

const SendPaymentEmail = (emailId, userName, order_id, pay_name, amount, tennure_month) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${emailId}`,
      subject: `${userName}, thank you for your payment`,
      html: `<html>
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
          html {
              height: 100%;
          }
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
          button {
              transition: all 0.3s;
              transition: all 500ms ease-in-out
          }
          img {
              max-width: 100%
          }
          </style>
          <body>
          <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="text-align:center">
            <tbody>
              <tr>
            <td>
            <div style="max-width:640px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-left:0;padding-right:0; padding-bottom: 12px; padding-top: 12px">
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
            <tbody>
            <tr>
            <td width="174" align="left" style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="left">
            <tbody>
            <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:16px">
            <img src="images/logo_new.png" alt="" style="max-width: 70px; width: 100%"/></td>
            </tr>
            </tbody>
            </table></td>
            <td align="right" style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0"><table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tbody>
            <tr>
            <td align="right" style="padding-top:0;padding-bottom:0px;padding-left:0;padding-right:20px;text-align:right"><p style="margin-top:0px;margin-bottom:0px;font-family:'gdsherpa',Helvetica,Arial,sans-serif;font-size:13px;line-height:21px"><br>
	Customer Support: <a href="mailto:info@mysoulmate.co.in" style="text-decoration: underline; color: #d42c3d;">info@mysoulmate.co.in</a> </p></td>
            </tr>
            </tbody>
            </table></td>
            </tr>
            </tbody>
            </table>
            </div>
            </td>
              </tr>
             <tr>
             <td>
            <div style="max-width:640px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-left:0;padding-right:0">
            <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="font-family:serif;color:#ffffff; background-color: #d42c3d;">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding-top:60px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#d42c3d;font-size:30px;line-height:46px;font-weight:bold;font-family:'Times New Roman',Times,serif,'gd-sage-bold'"><span>Thanks for your order, ${userName}.</span></td>
                                </tr>
                    <tr>
                    <td dir="ltr" align="left" style="padding-top:40px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#d42c3d;font-family:'gdsherpa',Helvetica,Arial,sans-serif"><p style="Margin-top:0px;Margin-bottom:0px;font-family:'gdsherpa',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px"> Here's your confirmation for order number ${order_id}. Review your receipt and get started using your products. </p></td>	
                    </tr>
                    <tr>
                                                  <td align="center" style="font-size:16px; padding-top: 40px; padding-bottom: 40px; line-height:20px;font-family:'gdsherpa',Helvetica,Arial,sans-serif;"><span> 
                                <a href="${server_url}/#/paymenthistory" style="text-decoration:none;background-color:#fff;border-top:20px solid #fff;border-bottom:20px solid #fff;border-left:40px solid #fff;border-right:40px solid #fff;display:inline-block;color:#111;text-align:center" target="_blank">Access All Products</a> </span></td>
                                                </tr>
                              </tbody>
                            </table>
            </div></td>
              </tr>
          <tr>
          <td>
          <div style="max-width:640px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-left:0;padding-right:0">
          <table bgcolor="#fff" width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="font-family:'gdsherpa-bold','Helvetica Bold','Arial Bold',sans-serif">
          <tbody>
          <tr>
          <td bgcolor="#fff" align="left" style="padding-top:60px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#fff;font-weight:bold;font-family:'gdsherpa-bold','Helvetica Bold','Arial Bold',sans-serif;font-size:21px;line-height:31px;color:#111"><p style="Margin-top:0px;Margin-bottom:0px;font-family:'gdsherpa-bold','Helvetica Bold','Arial Bold',sans-serif;font-size:21px;line-height:31px"> Order Number: ${order_id} </p></td>
          </tr>
          <tr>
          <td style="padding-top:20px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#ffffff">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #cccccc;">
            <tbody>
              <tr style="background: #333; color: #fff; font-size: 14px;">
                <td align="left" valign="middle" style="padding: 10px;">Qty</td>
                <td align="left" valign="middle" style="padding: 10px;">Product</td>
                <td align="left" valign="middle" style="padding: 10px;">Tennure(In Month)</td>
                <td align="right" valign="middle" style="padding: 10px;">Total</td>
              </tr>
              <tr style="color: #333; font-size: 14px;">
                <td align="left" valign="middle" style="padding: 10px; border-bottom: 1px solid #cccccc;"><p>1</p></td>
                <td align="left" valign="middle" style="padding: 10px; border-left: 1px solid #cccccc; border-bottom: 1px solid #cccccc;">${pay_name}</td>
                <td align="left" valign="middle" style="padding: 10px; border-left: 1px solid #cccccc; border-bottom: 1px solid #cccccc;"><p>${tennure_month} month</p></td>
      <td align="right" valign="middle" style="padding: 10px; border-right: 1px solid #cccccc; border-bottom: 1px solid #cccccc;"><p> ₹ ${amount}.00 </p></td>
              </tr>
              <tr style="color: #333; font-size: 14px;">
                <td align="left" valign="middle" style="padding: 10px;"> </td>
                <td align="left" valign="middle" style="padding: 10px;">&nbsp;</td>
                <td align="left" valign="middle" style="padding: 10px;">&nbsp;</td>
                <td align="right" valign="middle" style="padding: 10px;">Total:  	    ₹ ${amount}.00</td>
              </tr>
            </tbody>
          </table>
          </td>
          </tr>
          <tr>
            <td height="60" style="background-color:#fff;padding-top:40px;padding-bottom:40px;padding-right:40px;padding-left:40px;text-align:left; border-bottom: 2px solid #111;">
              <a href="${server_url}/#/paymenthistory" style="text-decoration:none;background-color:#fff;border-top:20px solid #fff; border: 1px solid #111; display:inline-block;color:#111;text-align:center; padding: 18px 25px;" target="_blank">View Full Receipt</a>
              <p style="Margin-top:0px;Margin-bottom:0px;font-size:0px;line-height:0px">&nbsp; </p></td>
          </tr>
          </tbody>
          </table>
          </div>
          </td>
          </tr>
            </tbody>
          </table>
          </body>
          </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        resolve({ suc: 0, msg: error })
      } else {
        console.log('Email sent:', info.response);
        resolve({ suc: 1, msg: 'Email sent successfully' })
      }
    });
  })
}

module.exports = { SendUserEmail, sendLoginEmail, SendVerifyEmail, ContactUserEmail, SendForgetPwdEmail, SendPaymentEmail }