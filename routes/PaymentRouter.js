const { getTypeList, getDetailsList, getAmountList, get_amount } = require('../module/PaymentModule');
const express = require('express');
paymentRouter = express.Router();

paymentRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

paymentRouter.get("/subscription_type", async(req, res) => {
  var type_data = await getTypeList();
  // console.log('gfdgf', type_data);
  var data = {
    type_data,
    header: "Type List",
  };
  res.render("payment/subscription_type",data)
    // res.render("payment/subscription_type");
});

paymentRouter.get("/view_type", async (req, res) => {
  var type_data = await getTypeList();
  // console.log('gfdgf', type_data);
  var data = {
    type_data,
    header: "Type List",
  };
  res.render("payment/subscription_type",data)
});

paymentRouter.get("/subscription_dtls", async(req, res) => {
  var dtls_data = await getDetailsList();
  var res_data = {
    data: dtls_data.suc > 0 ? dtls_data.msg : [],
    header: "Details List",
  }
  res.render("payment/subscription_dtls", res_data)
});

paymentRouter.get("/subscription_amount", async(req, res) => {
  var amount_data = await getAmountList();
  var data = {
    amount_data,
    header: "Amount_Tennure_data",
  }
  res.render("payment/subscription_amount", data)
});



module.exports = {paymentRouter};