const { db_Select } = require("./MasterModule");


const invoice_description = (order_id) => {
    return new Promise (async (resolve, reject) => {
      var select = 'a.*, b.pay_name pack_name, c.tennure_period, 1 qty',
      table_name = 'td_payment_request a, md_subscription b, md_subscription_pay_dtls c',
      whr = `a.pack_id=b.id AND b.id=c.sub_id AND order_id = ${order_id}`,
      order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      resolve(res_dt);
    });
  };

  module.exports = {invoice_description}