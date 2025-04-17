const { saveType } = require('../module/Add_typeModule')

const express = require('express');
const { getTypeList } = require('../module/PaymentModule');
add_typeRouter = express.Router();
dateFormat = require("dateformat");

add_typeRouter.use((req, res, next) => {
    var user = req.session.user;
    if (!user) {
      res.redirect("/login");
    } else {
      next();
    }
  });

add_typeRouter.get("/add_type", async(req, res) => {
    id = req.query.id;
    pay_name = req.query.pay_name;
    // console.log(id,pay_name);
    var res_dt = await getTypeList(id);
    // console.log('ggg', res_dt);
    var data = {
        res_dt,
        id,
        header: "Type List",
    }
    res.render("payment/add_type", data);
});

add_typeRouter.post("/save_type", async(req, res) =>{
    var data = req.body;
    // console.log(data);
    var res_dt = await saveType(data);
    // console.log(res_dt);
    // res.send(res_dt);
    res.redirect("/payment/subscription_type");
});


module.exports = {add_typeRouter}