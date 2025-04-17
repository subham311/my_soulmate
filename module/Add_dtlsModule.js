const dateFormat = require("dateformat");
const { db_Insert, db_Delete } = require("./MasterModule");

const saveDtls = (data) => {
 return new Promise(async (resolve, reject) => {
    var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    if(Array.isArray(data.dtls)){
        await db_Delete('md_subscription_dtls', `sub_id=${data.sub_id_input}`)
        var dtls_data;
        for(let dt of data.dtls){
            // var table_name = 'md_subscription_dtls',
            //     fields = data.id > 0 ? `sub_id='${data.sub_id}', subscription_dtls='${dt}', modified_by = 'admin', modified_dt = '${datetime}'` :
            //     `(sub_id, subscription_dtls, created_by, created_dt)`,
            //     values = `('${data.sub_id}', '${dt}', 'admin', '${datetime}')`,
            //     whr = data.id > 0 ? `id = ${data.id}` : null,
            //     flag = data.id > 0 ? 1 : 0;
            // var dtls_data = await db_Insert(table_name, fields, values, whr, flag);
            var table_name = 'md_subscription_dtls',
                fields = `(sub_id, subscription_dtls, created_by, created_dt)`,
                values = `('${data.sub_id}', '${dt}', 'admin', '${datetime}')`,
                whr = null,
                flag = 0;
            dtls_data = await db_Insert(table_name, fields, values, whr, flag);
        }
        resolve(dtls_data)
    }else{
        var table_name = 'md_subscription_dtls',
            fields = data.sub_id_input > 0 ? `sub_id='${data.sub_id}', subscription_dtls='${data.dtls}', modified_by = 'admin', modified_dt = '${datetime}'` :
            `(sub_id, subscription_dtls, created_by, created_dt)`,
            values = `('${data.sub_id}', '${data.dtls}', 'admin', '${datetime}')`,
            whr = data.sub_id_input > 0 ? `sub_id = ${data.sub_id_input}` : null,
            flag = data.sub_id_input > 0 ? 1 : 0;
        var dtls_data = await db_Insert(table_name, fields, values, whr, flag);
        resolve(dtls_data);
    }
 });
};

module.exports = { saveDtls}