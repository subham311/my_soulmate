const dateFormat = require("dateformat");
const { db_Insert } = require("./MasterModule");

const saveAmount = (data) => {
 return new Promise(async (resolve, reject) => {
   var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var table_name = 'md_subscription_pay_dtls',
    fields = data.id > 0 ? `sub_id='${data.sub_id}', actual_price='${data.actual_price}', discount='${data.discount}', amount='${data.amount}', tennure_period='${data.tennure}',modified_by = 'admin', modified_dt = '${datetime}'` :
    `(sub_id, actual_price, discount, amount, tennure_period, created_by, created_dt)`,
    values = `('${data.sub_id}','${data.actual_price}','${data.discount}','${data.amount}','${data.tennure}','admin', '${datetime}')`,
    whr = data.id > 0 ? `id= ${data.id}` : null,
    flag = data.id > 0 ? 1 : 0;
    var amount_data = db_Insert(table_name, fields, values, whr, flag);
    resolve(amount_data);
 });
};

module.exports = { saveAmount }