const express = require('express'),
    PaymentRouter = express.Router(),
    dateFormat = require("dateformat"),
    qs = require('querystring');
const { SendPaymentEmail } = require('../module/EmailModule');
const { db_Insert, db_Select, getOrderMaxId } = require('../module/MasterModule');
const { reqEncrypt, reqDecrypt } = require('../module/ccavutil');

var client_fail_redirect_url = 'https://mysoulmate.co.in/#/user/paymentGetway',
    client_suc_redirect_url = 'https://mysoulmate.co.in/#/user/paymentResponse',
    redirect_url = 'https://api.mysoulmate.co.in/payRes';

PaymentRouter.post('/encReqData', async (req, res) => {
    var workingKey = process.env.WORKING_KEY,		//Put in the 32-Bit key shared by CCAvenues.
        accessCode = process.env.ACCESS_CODE,		//Put in the access code shared by CCAvenues.
        encRequest = '',
        formbody = '',
        datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    var data = req.body,
        body = `merchant_id=${data.merchant_id}&order_id=${data.order_id}&currency=${data.currency}&amount=${data.amount}&redirect_url=${data.redirect_url}&cancel_url=${data.cancel_url}&language=${data.language}&billing_name=${data.billing_name}&billing_address=${data.billing_address}&billing_city=${data.billing_city}&billing_state=${data.billing_state}&billing_zip=${data.billing_zip}&billing_country=${data.billing_country}&billing_tel=${data.billing_tel}&billing_email=${data.billing_email}&delivery_name=${data.delivery_name}&delivery_address=${data.delivery_address}&delivery_city=${data.delivery_city}&delivery_state=${data.delivery_state}&delivery_zip=${data.delivery_zip}&delivery_country=${data.delivery_country}&delivery_tel=${data.delivery_tel}&merchant_param1=${data.merchant_param1}&merchant_param2=${data.merchant_param2}&merchant_param3=${data.merchant_param3}&merchant_param4=${data.merchant_param4}&merchant_param5=${data.merchant_param5}&promo_code=&customer_identifier=`;
    // console.log(body);
    var table_name = 'td_payment_request',
        fields = `(tnx_date,merchant_id,order_id,currency,amount,redirect_url,cancel_url,language,billing_name,billing_address,billing_city,billing_state,billing_zip,billing_country,billing_tel,billing_email,delivery_name,delivery_address,delivery_city,delivery_state,delivery_zip,delivery_country,delivery_tel,customer_identifier,pack_id,created_by,created_dt)`,
        values = `("${datetime}", "${data.merchant_id}", "${data.order_id}", "${data.currency}", "${data.amount}", "${data.redirect_url}", "${data.cancel_url}", "${data.language}", "${data.billing_name}", "${data.billing_address}", "${data.billing_city}", "${data.billing_state}", "${data.billing_zip}", "${data.billing_country}", "${data.billing_tel}", "${data.billing_email}", "${data.delivery_name}", "${data.delivery_address}", "${data.delivery_city}", "${data.delivery_state}", "${data.delivery_zip}", "${data.delivery_country}", "${data.delivery_tel}", "${data.user_id}", "${data.pack_id}", "${data.user}", "${datetime}")`,
        whr = null,
        flag = 0;
    var req_dt = await db_Insert(table_name, fields, values, whr, flag)
    encRequest = reqEncrypt(body, workingKey);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';

    res.writeHead(200, { "Content-Type": "text/html" });
    res.send(formbody);
})

// PAYMENT REQUEST //
PaymentRouter.get('/PayReq', async (req, res) => {
    var data = req.query.data
    data = Buffer.from(data, "base64").toString();
    data = JSON.parse(data)

    var get_max_id = await getOrderMaxId(data.financial_yr)
    var order_max_id = get_max_id.suc > 0 ? get_max_id.msg[0].max_id : 0
    var order_id = `${data.financial_yr}-${order_max_id}`

    var workingKey = process.env.WORKING_KEY,		//Put in the 32-Bit key shared by CCAvenues.
        accessCode = process.env.ACCESS_CODE,		//Put in the access code shared by CCAvenues.
        merchant_id = process.env.MERCHANT_ID,
        encRequest = '',
        formbody = '',
        datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    var table_name = 'td_payment_request',
        fields = `(tnx_date,merchant_id,financial_yr,order_id,currency,amount,redirect_url,cancel_url,language,billing_name,billing_address,billing_city,billing_state,billing_zip,billing_country,billing_tel,billing_email,delivery_name,delivery_address,delivery_city,delivery_state,delivery_zip,delivery_country,delivery_tel,customer_identifier,pack_id,created_by,created_dt)`,
        values = `("${datetime}", "${data.merchant_id}", "${data.financial_yr}", "${order_id}", "${data.currency}", "${data.amount}", "${data.redirect_url}", "${data.cancel_url}", "${data.language}", "${data.billing_name}", "${data.billing_address}", "${data.billing_city}", "${data.billing_state}", "${data.billing_zip}", "${data.billing_country}", "${data.billing_tel}", "${data.billing_email}", "${data.delivery_name}", "${data.delivery_address}", "${data.delivery_city}", "${data.delivery_state}", "${data.delivery_zip}", "${data.delivery_country}", "${data.delivery_tel}", "${data.user_id}", "${data.pack_id}", "${data.user}", "${datetime}")`,
        whr = null,
        flag = 0;
    var req_dt = await db_Insert(table_name, fields, values, whr, flag)
    if (req_dt.suc > 0) {
        var body = `merchant_id=${merchant_id}&order_id=${encodeURIComponent(order_id)}&currency=${data.currency}&amount=${data.amount}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=${data.language}&billing_name=${data.billing_name}&billing_address=${data.billing_address}&billing_city=${data.billing_city}&billing_state=${data.billing_state}&billing_zip=${data.billing_zip}&billing_country=${data.billing_country}&billing_tel=${data.billing_tel}&billing_email=${data.billing_email}&delivery_name=${data.delivery_name}&delivery_address=${data.delivery_address}&delivery_city=${data.delivery_city}&delivery_state=${data.delivery_state}&delivery_zip=${data.delivery_zip}&delivery_country=${data.delivery_country}&delivery_tel=${data.delivery_tel}&merchant_param1=${data.merchant_param1}&merchant_param2=${data.merchant_param2}&merchant_param3=${data.merchant_param3}&merchant_param4=${data.merchant_param4}&merchant_param5=${data.merchant_param5}&promo_code=&customer_identifier=`;
        encRequest = reqEncrypt(body, workingKey);
        formbody = '<form id="nonseamless" method="post" name="redirect" action="' + process.env.CCAVENUE_URL + '/transaction/transaction.do?command=initiateTransaction"> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(formbody);
        res.end();
    } else {
        res.redirect(client_fail_redirect_url)
    }
})

// PAYMENT RESPONSE //
PaymentRouter.post('/payRes', async (req, res) => {
    var workingKey = process.env.WORKING_KEY,
        reqData = req.body,
        datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var encryption = reqData.encResp;

    var data = reqDecrypt(encryption, workingKey);
    var res_dt = data.split('&').map(dt => {
        var ndt = {};
        ndt[dt.split('=')[0]] = dt.split('=')[1]
        return ndt;
    })
    var newResDt = {}
    for (let dt of res_dt) {
        newResDt[Object.keys(dt)[0]] = Object.values(dt)[0]
    }
    var trans_date;
    try {
        if (newResDt.trans_date != 'null') {
            if (isNaN(Date.parse(newResDt.trans_date))) {
                const [tDate, tTime] = newResDt.trans_date.split(' ');
                trans_date = new Date(tDate.split('/')[2], tDate.split('/')[1] - 1, tDate.split('/')[0], tTime.split(':')[0], tTime.split(':')[1], tTime.split(':')[2])
                trans_date = dateFormat(trans_date, 'yyyy-mm-dd HH:MM:ss')
            } else {
                trans_date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
            }
        } else {
            trans_date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        }
    } catch (err) {
        console.log('Wrond DateFormat', newResDt.trans_date, err);
        trans_date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
    }
    var table_name = 'td_payment_request',
        fields = `tracking_id = "${newResDt.tracking_id}", bank_ref_no = "${newResDt.bank_ref_no}", order_status = "${newResDt.order_status}", failure_message = "${newResDt.failure_message}", payment_mode = "${newResDt.payment_mode}", status_code = "${newResDt.status_code}", status_message = "${newResDt.status_message}", vault = "${newResDt.vault}", offer_type = "${newResDt.offer_type}", offer_code = "${newResDt.offer_code}", discount_value = "${newResDt.discount_value}", mer_amount = "${newResDt.mer_amount}", eci_value = "${newResDt.eci_value}", response_code = "${newResDt.response_code}", billing_notes = "${newResDt.billing_notes}", trans_rec_date = "${trans_date}", modified_by = "${newResDt.billing_name}", modified_dt = "${datetime}"`,
        values = null,
        whr = `order_id = '${newResDt.order_id}'`,
        flag = 1;
    var req_dt = await db_Insert(table_name, fields, values, whr, flag)
    if (newResDt.order_status == 'Success') {
        var chk_dt = await db_Select('a.order_id, a.pack_id, a.customer_identifier user_id, c.tennure_period period, b.pay_name, c.amount', 'td_payment_request a, md_subscription b, md_subscription_pay_dtls c', `a.pack_id=b.id AND b.id=c.sub_id AND a.order_id = '${newResDt.order_id}'`, null)
        if (chk_dt.suc > 0) {
            var tnx_date = new Date(trans_date),
                expire_dt = new Date(trans_date);
            expire_dt = expire_dt.setDate(expire_dt.getDay() + (30 * parseInt(chk_dt.msg[0].period > 0 ? chk_dt.msg[0].period : 0)))
            var table_name = 'td_user_payment',
                fields = `(user_id, order_id, tnx_date, plan_id, active_dt, expire_dt, amount, created_by, created_dt)`,
                values = `('${chk_dt.msg[0].user_id}', '${newResDt.order_id}', '${dateFormat(tnx_date, "yyyy-mm-dd HH:MM:ss")}', '${chk_dt.msg[0].pack_id}', '${dateFormat(tnx_date, "yyyy-mm-dd HH:MM:ss")}', '${dateFormat(expire_dt, "yyyy-mm-dd HH:MM:ss")}', '${newResDt.amount}', 'System', '${datetime}')`,
                whr = null,
                flag = 0;
            var pay_dt_sub = await db_Insert(table_name, fields, values, whr, flag)
            await db_Insert('td_user_profile', `pay_flag = 'Y', plan_id = '${chk_dt.msg[0].pack_id}', plan_act_dt = '${dateFormat(tnx_date, "yyyy-mm-dd HH:MM:ss")}', plan_exp_dt = '${dateFormat(expire_dt, "yyyy-mm-dd HH:MM:ss")}'`, null, `id = ${chk_dt.msg[0].user_id}`, 1)
        }
        try {
            await SendPaymentEmail(newResDt.billing_email, newResDt.billing_name, newResDt.order_id, chk_dt.msg[0].pay_name, chk_dt.msg[0].amount, chk_dt.msg[0].period)
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect(`${client_suc_redirect_url}/${newResDt.order_status == 'Success' ? 1 : 0}/${newResDt.order_id}`)
})

PaymentRouter.post('/get_pay_response', async (req, res) => {
    var data = req.body
    var select = 'a.*, b.pay_name pack_name, c.tennure_period, 1 qty',
        table_name = 'td_payment_request a, md_subscription b, md_subscription_pay_dtls c',
        whr = `a.pack_id=b.id AND b.id=c.sub_id AND order_id = '${data.order_id}'`,
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

PaymentRouter.get('/payment_history', async (req, res) => {
    var data = req.query, result;
    var select = "a.order_id, a.tnx_date, a.active_dt, a.expire_dt, a.amount, b.tracking_id, b.currency, b.bank_ref_no,b.trans_rec_date,b.payment_mode,b.billing_name,b.billing_address,b.billing_city,b.billing_zip,b.billing_country,b.billing_state,b.billing_tel,b.billing_email, c.pay_name, d.tennure_period,1 qty",
        table_name = 'td_user_payment a, td_payment_request b, md_subscription c, md_subscription_pay_dtls d',
        whr = `a.order_id=b.order_id AND a.plan_id=c.id AND a.plan_id=d.sub_id AND a.user_id = ${data.user_id}`,
        order = `order by a.tnx_date desc`;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})

module.exports = { PaymentRouter }