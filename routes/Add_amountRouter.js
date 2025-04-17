const express = require('express');
const { saveAmount } = require('../module/Add_amountModule');
const { getAmountList, getTypeList } = require('../module/PaymentModule');
add_amountRouter = express.Router();

add_amountRouter.get("/add_amount", async (req, res) => {
   var id = req.query.id;
    var typeList = await getTypeList();
    var amountList = {suc:0, msg:[]};
    if(id > 0)
        amountList = await getAmountList(id)
    var data = {
        amountList : amountList.suc > 0 ? amountList.msg : [],
        type_list : typeList.suc > 0 ? typeList.msg : [],
        id,
        header : 'Amount_Tennure_list',
    }
    res.render("payment/add_amount_tennure", data)
});

add_amountRouter.post("/save_amount", async(req, res)=> {
    var data = req.body;
    var res_dt = await saveAmount(data);
    console.log(res_dt);
    res.redirect("/payment/subscription_amount")
})

module.exports = {add_amountRouter}