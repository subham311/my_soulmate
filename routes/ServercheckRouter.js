const { checkFieldsValue, db_Check } = require('../module/MasterModule');

const express = require('express'),
    ServercheckRouter = express.Router(),
    dateFormat = require("dateformat"),
    path = require("path");

ServercheckRouter.post("/user_check", async (req, res) => {
    var data = req.body, err_msg = {};
    const birthdate = new Date(data.field_birth_date);
    //calculate month difference from current date in time
    var month_diff = Date.now() - birthdate.getTime();
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);
    //extract year from date    
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    var chk_pro_dt = await db_Check('id', 'td_user_profile', `phone_no='${data.field_mobile}'`)
    if (chk_pro_dt.msg > 0) {
        res.send({ suc: 0, msg: 'Phone no already exist' })
    } else {
        var chk_user_dt = await db_Check('id', 'md_user_login', `user_id='${data.field_mobile}'`)
        if (chk_user_dt.msg > 0) {
            res.send({ suc: 0, msg: 'Phone no already exist' })
        } else {
            if (age < 18) {
                res.send({ suc: 0, msg: 'You must be 18 or older to access this Website.' });
            } else {
                err_msg['user'] = await checkFieldsValue(data.user, 'string')
                err_msg['field_mobile'] = await checkFieldsValue(data.field_mobile, 'phone')
                err_msg['field_birth_date'] = await checkFieldsValue(data.field_birth_date, 'date')
                err_msg['location_id'] = await checkFieldsValue(data.location_id, 'string')
                var res_dt = { suc: err_msg['user'] != 'valid' || err_msg['field_mobile'] != 'valid' || err_msg['field_birth_date'] != 'valid' || err_msg['location_id'] != 'valid' ? 0 : 1, msg: err_msg }
                res.send(res_dt)
            }
        }
    }
});

ServercheckRouter.post("/user_basic_details", async (req, res) => {
    var data = req.body, err_msg = {};

    var chk_basic_dt = await db_Check('id', 'td_user_profile', `email_id='${data.field_email_id}'`)
    if (chk_basic_dt.msg > 0) {
        res.send({ suc: 0, msg: 'Email Id already exist' })
    } else {
        var chk_basic_dt = await db_Check('id', 'md_user_login', `email_id='${data.field_email_id}'`)
        if (chk_basic_dt.msg > 0) {
            res.send({ suc: 0, msg: 'Email Id already exist' })
        } else {
            err_msg['field_gender'] = await checkFieldsValue(data.field_gender, 'string')
            err_msg['field_who_creat_profile'] = await checkFieldsValue(data.field_who_creat_profile, 'string')
            err_msg['field_email_id'] = await checkFieldsValue(data.field_email_id, 'string')
            err_msg['field_Country'] = await checkFieldsValue(data.field_Country, 'number')
            err_msg['field_State'] = await checkFieldsValue(data.field_State, 'number')
            err_msg['field_mother_tong'] = await checkFieldsValue(data.field_mother_tong, 'string')
            err_msg['field_pass'] = await checkFieldsValue(data.field_pass, 'string')
            var res_dt = { suc: err_msg['field_gender'] != 'valid' || err_msg['field_who_creat_profile'] != 'valid' || err_msg['field_email_id'] != 'valid' || err_msg['field_Country'] != 'valid' || err_msg['field_State'] != 'valid' || err_msg['field_mother_tong'] != 'valid' || err_msg['field_pass'] != 'valid' ? 0 : 1, msg: err_msg }
            res.send(res_dt)
        }
    }
});

ServercheckRouter.post("/user_religion_details", async (req, res) => {
    var data = req.body, err_msg = {};

    err_msg['field_ur_religion'] = await checkFieldsValue(data.field_ur_religion, 'string')
    err_msg['field_cast'] = await checkFieldsValue(data.field_cast, 'number')
    var res_dt = { suc: err_msg['field_ur_religion'] != 'valid' || err_msg['field_cast'] != 'valid' ? 0 : 1, msg: err_msg }
    res.send(res_dt)
});

ServercheckRouter.post("/user_personal_details", async (req, res) => {
    var data = req.body, err_msg = {};

    err_msg['field_marital_status'] = await checkFieldsValue(data.field_marital_status, 'string')
    err_msg['field_height'] = await checkFieldsValue(data.field_height, 'string')
    err_msg['field_weight'] = await checkFieldsValue(data.field_weight, 'string')
    err_msg['field_body_type'] = await checkFieldsValue(data.field_body_type, 'string')
    err_msg['field_family_status'] = await checkFieldsValue(data.field_family_status, 'string')
    err_msg['field_family_type'] = await checkFieldsValue(data.field_family_type, 'string')
    err_msg['field_family_value'] = await checkFieldsValue(data.field_family_value, 'string')
    err_msg['field_disability'] = await checkFieldsValue(data.field_disability, 'string')
    var res_dt = { suc: err_msg['field_marital_status'] != 'valid' || err_msg['field_height'] != 'valid' || err_msg['field_weight'] != 'valid' || err_msg['field_body_type'] != 'valid' || err_msg['field_family_status'] != 'valid' || err_msg['field_family_type'] != 'valid' || err_msg['field_family_value'] != 'valid' || err_msg['field_disability'] != 'valid' ? 0 : 1, msg: err_msg }
    res.send(res_dt)
});

ServercheckRouter.post("/user_professional_details", async (req, res) => {
    var data = req.body, err_msg = {};

    err_msg['field_highest_education'] = await checkFieldsValue(data.field_highest_education, 'number')
    err_msg['field_employed'] = await checkFieldsValue(data.field_employed, 'string')
    err_msg['field_Occupation'] = await checkFieldsValue(data.field_Occupation, 'number')
    err_msg['field_Annual_Income'] = await checkFieldsValue(data.field_Annual_Income, 'string')
    err_msg['field_Work_Locatio'] = await checkFieldsValue(data.field_Work_Locatio, 'string')
    var res_dt = { suc: err_msg['field_highest_education'] != 'valid' || err_msg['field_employed'] != 'valid' || err_msg['field_Occupation'] != 'valid' || err_msg['field_Annual_Income'] != 'valid' || err_msg['field_Work_Locatio'] != 'valid' ? 0 : 1, msg: err_msg }
    res.send(res_dt)
});

ServercheckRouter.post("/user_about_details", async (req, res) => {
    var data = req.body, err_msg = {};

    err_msg['field_About_us'] = await checkFieldsValue(data.field_About_us, 'string')
    var res_dt = { suc: err_msg['field_About_us'] != 'valid' ? 0 : 1, msg: err_msg }
    res.send(res_dt)
});

module.exports = { ServercheckRouter };