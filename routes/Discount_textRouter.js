const express = require('express');
const { getTextList, saveText } = require('../module/Discount_textModule');
discount_textRouter = express.Router();
dateFormat = require("dateformat");

discount_textRouter.get("/discount_text_add", async (req, res) => {
    var text_data = await getTextList();
    // console.log(text_data,'text');
    var data = {
        text_data,
        header: "Discount Text List",
      };
    res.render("discount_text/discount_text_add", data);
});

discount_textRouter.get("/add_text", async(req, res) => {
    var id = req.query.id;
    var data = {suc: 0}
    if(id > 0){
        data = await getTextList(id);
    }
    res.render("discount_text/add_text",{
        data: data.suc > 0 ? data.msg.length > 0 ? data.msg[0] : [] : [], 
        id
    });
    // console.log(data,'data');
});

discount_textRouter.post('/save_text', async(req, res) =>{
    var data = req.body;
    // console.log(data);
    var res_dt = await saveText(data);
    // console.log(res_dt);
    res.redirect("/discount/discount_text_add");
})

module.exports = {discount_textRouter}