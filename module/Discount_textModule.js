const dateFormat = require("dateformat");
const { db_Select, db_Insert } = require("./MasterModule");

const getTextList = (id = 0) => {
    return new Promise(async (resolve, reject) => {
      var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
      var select = "id,discount_text,active_flag,created_by",
        table_name = "md_discount_text",
        whr = id > 0 ? `id=${id}` : null,
        order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      resolve(res_dt);
    });
  };    

  const saveText = (data) => {
    return new Promise(async (resolve, reject) => {
     var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        var table_name = 'md_discount_text',
        fields = data.id > 0 ? `discount_text = '${data.dtls!= '' ? data.dtls.split("'").join("\\'") : ''}', active_flag = '${data.active_flag != "Y" ? "N" : "Y"}' ,modified_by = 'admin', modified_dt = '${datetime}'`:
        `(discount_text, active_flag, created_by, created_dt)`,
        values = `('${data.dtls!= '' ? data.dtls.split("'").join("\\'") : ''}', '${data.active_flag != "Y" ? "N" : "Y"}', 'admin', '${datetime}')`,
        whr = data.id > 0 ? `id = ${data.id}` : null,
        flag = data.id > 0 ? 1 : 0;
    var type_data = await db_Insert(table_name, fields, values, whr, flag)
    resolve(type_data);
    });
};

  module.exports = {getTextList,saveText}