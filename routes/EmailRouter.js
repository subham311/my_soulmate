const { SendUserEmail, getUser } = require('../module/EmailModule');
const { EncryptDataToSend } = require('../module/MasterModule');

const express = require('express'),
EmailRouter = express.Router();

EmailRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

EmailRouter.get("/email", async (req, res) => {
    res.render("email/email_send");
});

EmailRouter.get("/get_user", async (req, res) => {
   var user = await getUser();
   user = await EncryptDataToSend(user);
   res.send(user)
});

EmailRouter.post("/send_email", async (req, res) => {
 var data = req.body;
 console.log(data);
  var user = await getUser();
  if(user.suc > 0 && user.msg.length > 0){
    var email
    for(let dt of user.msg){
        email = await SendUserEmail(dt.email_id,dt.profile_id,dt.u_name, data.summernote);
    }
   if(email.suc > 0){
      res.send({suc:1, msg: 'Email sent successfully'})
    }else {
      res.send({suc:0, msg: 'Email not sent'})
    }
  }else {
    res.send({suc:0, msg: 'Email Id not found'})
  }
})

module.exports = {EmailRouter};