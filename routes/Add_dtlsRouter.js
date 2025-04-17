const express = require('express');
const { getDetailsList, getTypeList } = require('../module/PaymentModule');
const { saveDtls } = require('../module/Add_dtlsModule');
add_dtlsRouter = express.Router();

add_dtlsRouter.get("/add_dtls", async (req, res) => {
    var sub_id = req.query.sub_id
    var res_dt = {suc:0, msg: []};
    var typeList = await getTypeList();
    if(sub_id > 0)
        res_dt = await getDetailsList(sub_id)
    var data = {
        res_dt: res_dt.suc > 0 ? res_dt.msg : [],
        type_list : typeList.suc > 0 ? typeList.msg : [],
        sub_id,
        header: "Detail List",
    }
res.render("payment/add_dtls", data)
});


add_dtlsRouter.post("/save_dtls", async (req, res) => {
    var data = req.body;
    // console.log(data);
    // var drop_data = req.body.selectedOption;
    // var text_data = req.body.dtls;
    // console.log(drop_data,text_data);
    var res_dt = await saveDtls(data);
    // console.log(res_dt);
    if(res_dt.suc > 0)
        res.redirect("/payment/subscription_dtls")
    else
        res.redirect(`/payment/add_dtls?sub_id=${data.sub_id_input}`)
})


module.exports = { add_dtlsRouter }