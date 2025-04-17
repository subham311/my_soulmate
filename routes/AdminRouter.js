const { db_Select } = require("../module/MasterModule");

const express = require("express");
AdminRouter = express.Router(), 
bcrypt = require("bcrypt");

AdminRouter.post("/admin_login", async (req, res) => {
  var data = req.body,
    result;
  var select = "id,user_name,email_id,password",
    table_name = "md_admin_login",
    whr = `email_id = '${data.email_id}'`,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      if (await bcrypt.compare(data.password, res_dt.msg[0].password)) {
        // console.log(await bcrypt.compare(data.password, res_dt.msg[0].password));
        // req.session.user = res_dt.msg[0];
        req.session.user = res_dt.msg[0]
        res.redirect("/dashboard");
      } else {
        result = {
          suc: 0,
          msg: "Please check your userid or password",
          user_data: null,
        };
        res.redirect("/login");
      }
    } else {
      result = { suc: 0, msg: "No data found", user_data: null };
    }
  } else {
    result = { suc: 0, msg: res_dt.msg };
  }
  //  res.send(result);
});

AdminRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// AdminRouter.get("/userlist", async (req, res) => {
//   // var data = req.query;
//   var user_list = await getUserList();
//   res.redirect("/user_list")
// })

module.exports = { AdminRouter };
