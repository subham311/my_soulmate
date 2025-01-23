const { db_Select } = require("./MasterModule");


const subscription_dtls = (data) => {
    return new Promise (async(resolve, reject) => {
        var select = "a.id,a.pay_name,b.sub_id,b.actual_price,b.discount,b.amount,b.tennure_period",
        table_name = 'md_subscription a,md_subscription_pay_dtls b',
        whr = data.id > 0 ? `a.id = b.sub_id AND a.id =${data.id}` : `a.id = b.sub_id`,
        order = `order by id`;
        var res_dt = await db_Select(select, table_name, whr, order);
        // console.log(res_dt);
        if(res_dt.msg.length > 0){
            for (let dt of res_dt.msg){
                var select = "sub_id,subscription_dtls",
                table_name = ' md_subscription_dtls',
                whr = `sub_id =${dt.id}`,
                order = null;
                var res_hdt = await db_Select(select, table_name, whr, order);
            dt['dtls']=res_hdt.suc > 0 ? res_hdt.msg : []
            }
            resolve(res_dt);
        }else{
        resolve(res_dt);
        }
    });
};

const discount_text_dtls = (data) => {
    return new Promise (async(resolve, reject) => {
        var select = "id,discount_text,active_flag",
        table_name = 'md_discount_text',
        whr = data.id > 0 ? `id =${data.id}` : `active_flag='Y'`,
        order = null;
        var res_dt = await db_Select(select, table_name, whr, order);
        console.log(res_dt);
        resolve(res_dt);
        }
)};

module.exports = {subscription_dtls,discount_text_dtls}