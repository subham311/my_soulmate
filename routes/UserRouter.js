const { sendProfile_id, loginOtp } = require("../module/SmsModule");
const { kundali, addKundaliUser } = require("./RasiRouter");
const { sendLoginEmail } = require("../module/EmailModule");
const { Encrypt, updateStatus, updateViewFlag } = require("../module/MasterModule");

const express = require("express"),
  UserRouter = express.Router(),
  dateFormat = require("dateformat"),
  nodemailer = require('nodemailer');
request = require("request"),
  bcrypt = require("bcrypt"),
  {
    db_Insert,
    db_Select,
    EncryptDataToSend,
    GenPassword,
  } = require("../module/MasterModule"),
  location = require("../location.json");

UserRouter.post("/user_profile", async (req, res) => {
  var req_data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  var profile_id = await GenPassword()

  req_data = Buffer.from(req_data.data, "base64").toString();
  req_data = JSON.parse(req_data);

  try {
    var BirthDate = new Date(req_data.field_birth_date).toISOString();
  } catch (err) {
    console.log(err);
  }

  profile_id = req_data.field_gender + profile_id
  var table_name = "td_user_profile",
    fields =
      req_data.id > 0
        ? `u_name = '${req_data.user}',
         location_id = '${req_data.location_id}',
        latt_long = '${req_data.field_birth_loca}', dob = '${dateFormat(
          req_data.field_birth_date,
          "yyyy-mm-dd HH:MM:ss"
        )}',
        ac_for = '${req_data.field_who_creat_profile}', religion = '${req_data.field_ur_religion
        }', gender = '${req_data.field_gender}',
          caste_id = '${req_data.reg_cust_id}',
        mother_tong = '${req_data.field_mother_tong}', modified_by = '${req_data.reg_name
        }', modified_dt = '${datetime}'`
        : "(profile_id, u_name, phone_no, email_id, country_id, state_id, city_id, location_id, latt_long, dob, ac_for, religion, gender, mother_tong, created_by, created_dt)",
    values = `('${profile_id}', '${req_data.user}', '${req_data.field_mobile}', '${req_data.field_email_id}', '${req_data.field_Country}', '${req_data.field_State}', '0', '${req_data.location_id}',
        '${req_data.field_birth_loca}', '${dateFormat(
      req_data.field_birth_date,
      "yyyy-mm-dd HH:MM:ss"
    )}', '${req_data.field_who_creat_profile}',
        '${req_data.field_ur_religion}', '${req_data.field_gender}', '${req_data.field_mother_tong
      }', '${req_data.user}', '${datetime}')`,
    whr = req_data.id > 0 ? `id= '${req_data.id}'` : null,
    flag = req_data.id > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);
  if (req_data.id > 0) {
  } else {
    if (res_dt.suc > 0) {
      try {
        var kundali_data = await kundali(res_dt.lastId.insertId, req_data.field_birth_loca, BirthDate)
        kundali_data.file_name ? await db_Insert('td_user_profile', `kundali_file_name='${kundali_data.file_name}', rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${res_dt.lastId.insertId}`, 1) : ''
      } catch (err) {
        console.log(err);
      }
      var pass = bcrypt.hashSync(req_data.field_pass, 10);
      var table_name = `md_user_login`,
        fields =
          "(profile_id , user_name, user_id, email_id, password, pay_status, created_by, created_dt)";
      values = `('${res_dt.lastId.insertId}', '${req_data.user}', '${req_data.field_mobile}', '${req_data.field_email_id}', '${pass}', 'N', '${req_data.user}', '${datetime}')`,
        whr = null,
        flag = 0;
      var log_dt = await db_Insert(table_name, fields, values, whr, flag);
      try {
        await sendProfile_id(req_data.field_mobile, profile_id)
      } catch (err) {
        console.log(err);
      }
    }
  }
  res.send(res_dt);
});

UserRouter.post("/user_caste", async (req, res) => {
  var req_data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  req_data = Buffer.from(req_data.data, "base64").toString();
  req_data = JSON.parse(req_data);
  // console.log(req_data);
  var table_name = "td_user_profile",
    fields = req_data.user_id > 0
      ? `caste_id = '${req_data.field_cast}', religion = '${req_data.field_ur_religion}', view_flag = 'N',modified_by = '${req_data.user}', modified_dt = '${datetime}'`
      : "(caste_id, religion, created_by, created_dt)",
    values = `('${req_data.field_cast}','${req_data.field_ur_religion}','${req_data.user},'${datetime}')`,
    whr = req_data.user_id > 0 ? `id= '${req_data.user_id}'` : null,
    flag = req_data.user_id > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var religion_data = req_data.edite_Flag > 0 ? await updateStatus(req_data.user_id, req_data.edite_Flag, 'U', req_data.user, dateFormat(req_data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }
  res.send(res_dt)
})

UserRouter.post("/user_personal_details", async (req, res) => {
  var req_data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  req_data = Buffer.from(req_data.data, "base64").toString();
  req_data = JSON.parse(req_data);
  var table_name = "td_user_p_dtls",
    fields =
      req_data.id > 0
        ? `marital_status = '${req_data.field_marital_status}', height = '${req_data.field_height}', 
        family_status = '${req_data.field_family_status}', family_type = '${req_data.field_family_type}', 
        family_values = '${req_data.field_family_value}', disability_flag = '${req_data.field_disability}', 
        weight = '${req_data.field_weight}', body_type = '${req_data.field_body_type}', 
      modified_by = '${req_data.reg_name}', modified_dt = '${datetime}'`
        : "(user_id, marital_status, height, family_status, family_type, family_values, disability_flag, weight, body_type, created_by, created_dt)",
    values = `('${req_data.user_id}', '${req_data.field_marital_status}', '${req_data.field_height}', '${req_data.field_family_status}',
        '${req_data.field_family_type}', '${req_data.field_family_value}', '${req_data.field_disability}', '${req_data.field_weight}', '${req_data.field_body_type}',
        '${req_data.user}', '${datetime}')`,
    whr = req_data.id > 0 ? `id= '${req_data.id}'` : null,
    flag = req_data.id > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);
  res.send(res_dt);
});

UserRouter.post("/user_professional", async (req, res) => {
  var req_data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  req_data = Buffer.from(req_data.data, "base64").toString();
  req_data = JSON.parse(req_data);
  console.log(req_data);
  var table_name = "td_user_education",
    fields =
      req_data.id > 0
        ? `heigh_education = '${req_data.field_highest_education}', emp_type = '${req_data.field_employed}', 
        occup = '${req_data.field_Occupation}', income = '${req_data.field_Annual_Income}', 
        work_location = '${req_data.field_Work_Locatio}', ancis_org = '${req_data.reg_Ancestral_Origin}',
        modified_by = '${req_data.reg_name}', modified_dt = '${datetime}'`
        : "(user_id, heigh_education, emp_type, occup, income, work_location, created_by, created_dt)",
    values = `('${req_data.user_id}', '${req_data.field_highest_education}', '${req_data.field_employed}', '${req_data.field_Occupation}',
        '${req_data.field_Annual_Income}', '${req_data.field_Work_Locatio}', '${req_data.user}', '${datetime}')`,
    whr = req_data.id > 0 ? `id= '${req_data.id}'` : null,
    flag = req_data.id > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);
  res.send(res_dt);
});

UserRouter.post("/user_about", async (req, res) => {
  var req_data = req.body;
  // res.send(req.body);
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  req_data = Buffer.from(req_data.data, "base64").toString();
  req_data = JSON.parse(req_data);
  // console.log(req_data);
  var table_name = "td_user_profile",
    fields = `about_us = "${req_data.field_About_us}", ${req_data.field_disclaimer ? `disclaimer = '${req_data.field_disclaimer}',` : ''} ${req_data.field_policy ? `policy = '${req_data.field_policy}',` : ''} view_flag = 'N', modified_by = '${req_data.user}', modified_dt = '${datetime}'`,
    values = null,
    whr = `id= '${req_data.user_id}'`,
    flag = 1;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var update_data = req_data.edite_Flag > 0 ? await updateStatus(req_data.user_id, req_data.edite_Flag, 'U', req_data.user, dateFormat(req_data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  var select =
    "id, kundali_file_name, rasi_id, nakhatra_id, jotok_rasi_id, dob, latt_long, profile_verify_flag",
    table_name = "td_user_profile",
    whr = `id = '${req_data.user_id}'`,
    order = null;
  var proChk = await db_Select(select, table_name, whr, order);
  if (proChk.suc > 0) {
    if (proChk.msg.length > 0) {
      if (proChk.msg[0].kundali_file_name) {
        if (proChk.msg[0].rasi_id > 0 && proChk.msg[0].nakhatra_id > 0 && proChk.msg[0].jotok_rasi_id > 0) {
          true;
        } else {
          try {
            var kundali_data = await addKundaliUser(proChk.msg[0].kundali_file_name)
            await db_Insert('td_user_profile', `rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${proChk.msg[0].id}`, 1)
          } catch (err) {
            console.log(err);
          }
        }
      } else if (proChk.msg[0].kundali_file_name == '' || proChk.msg[0].kundali_file_name == null || proChk.msg[0].kundali_file_name == undefined) {
        // console.log('here');
        try {
          var BirthDate = new Date(proChk.msg[0].dob).toISOString();
        } catch (err) {
          console.log(err);
        }
        try {
          var kundali_data = await kundali(proChk.msg[0].id, proChk.msg[0].latt_long, BirthDate)
          kundali_data.file_name ? await db_Insert('td_user_profile', `kundali_file_name='${kundali_data.file_name}', rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${proChk.msg[0].id}`, 1) : ''
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  res.send(res_dt);
});

UserRouter.post("/login", async (req, res) => {
  var data = req.body,
    result;
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select =
    "a.id prof_id, a.user_id, a.profile_id id, b.profile_id profile_code, a.user_name, a.email_id user_email, a.password, a.last_login, a.pay_status pay_flag, b.plan_id, b.kundali_file_name, b.rasi_id, b.nakhatra_id, b.jotok_rasi_id, b.dob, b.latt_long, b.active_flag, b.profile_verify_flag, IF(b.plan_id > 0, (SELECT c.pay_name FROM md_subscription c WHERE b.plan_id=c.id), 'Free') pay_name",
    table_name = "md_user_login a, td_user_profile b",
    whr = `a.profile_id=b.id AND a.user_id = '${data.user_id}'`,
    order = `HAVING a.user_id > 0`;
  var res_dt = await db_Select(select, table_name, whr, order);
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      if (res_dt.msg[0].active_flag != 'N') {
        if (await bcrypt.compare(data.password, res_dt.msg[0].password)) {
          try {
            await db_Insert('md_user_login', `last_login="${datetime}"`, null, `user_id=${res_dt.msg[0].user_id}`, 1)
          } catch (err) {
            console.log(err);
          }
          if (res_dt.msg[0].kundali_file_name) {
            if (res_dt.msg[0].rasi_id > 0 && res_dt.msg[0].nakhatra_id > 0 && res_dt.msg[0].jotok_rasi_id > 0) {
              true;
            } else {
              try {
                var kundali_data = await addKundaliUser(res_dt.msg[0].kundali_file_name)
                await db_Insert('td_user_profile', `rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${res_dt.msg[0].id}`, 1)
              } catch (err) {
                console.log(err);
              }
            }
          } else if (res_dt.msg[0].kundali_file_name == '' || res_dt.msg[0].kundali_file_name == null || res_dt.msg[0].kundali_file_name == undefined) {
            console.log('here');
            try {
              var BirthDate = new Date(res_dt.msg[0].dob).toISOString();
            } catch (err) {
              console.log(err);
            }
            try {
              var kundali_data = await kundali(res_dt.msg[0].id, res_dt.msg[0].latt_long, BirthDate)
              kundali_data.file_name ? await db_Insert('td_user_profile', `kundali_file_name='${kundali_data.file_name}', rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${res_dt.msg[0].id}`, 1) : ''
            } catch (err) {
              console.log(err);
            }
          }
          result = {
            suc: 1,
            msg: "successfully loggedin",
            user_data: res_dt.msg,
          };
        } else {
          result = {
            suc: 0,
            msg: "Please check your userid or password",
            user_data: null,
          };
        }
      } else {
        result = { suc: 0, msg: 'Your account has been deactivated, please contact with Admin.' };
      }
    } else {
      result = { suc: 2, msg: "This Mobile no. is not registered with us.", user_data: null };
    }
  } else {
    result = { suc: 0, msg: res_dt.msg };
  }
  res.send(result);
});

UserRouter.post('/login_otp', async (req, res) => {
  var data = req.body;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  console.log(data);
  var select =
    "a.id, b.active_flag, a.email_id, a.user_name",
    table_name = "md_user_login a, td_user_profile b",
    whr = `a.profile_id=b.id AND a.user_id = '${data}'`,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  console.log(res_dt, 'OTP Login Data');
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      if (res_dt.msg[0].active_flag != 'N') {
        var otp = Math.floor(1000 + Math.random() * 9000);
        var otpRes = await loginOtp(otp, data)
        var email = await sendLoginEmail(otp, res_dt.msg[0].email_id, res_dt.msg[0].user_name)
        console.log(email);
        if (otpRes.suc > 0) {
          res.send({ suc: 1, msg: 'OTP Sent', otp: await Encrypt(otp.toString()) });
        } else {
          res.send({ suc: 0, msg: 'OTP not sent', otp: 0 })
        }
      } else {
        res.send({ suc: 0, msg: 'Your account has been deactivated, please contact with Admin.', otp: 0 })
      }
    } else {
      res.send({ suc: 2, msg: 'This Mobile no. is not registered with us', otp: 0 })
    }
  } else {
    res.send({ suc: 0, msg: res_dt.msg, otp: 0 })
  }
})

UserRouter.post('/get_login_data', async (req, res) => {
  var data = req.body,
    result;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  // console.log(data);
  var select =
    "a.id prof_id, a.user_id, a.profile_id id, a.user_name, a.email_id user_email, a.password, a.last_login, a.pay_status pay_flag, b.plan_id, a.active_flag, b.kundali_file_name, b.rasi_id, b.nakhatra_id, b.jotok_rasi_id, b.dob, b.latt_long, IF(b.plan_id > 0, (SELECT c.pay_name FROM md_subscription c WHERE b.plan_id=c.id), 'Free') pay_name",
    table_name = "md_user_login a, td_user_profile b",
    whr = `a.profile_id=b.id AND a.user_id = '${data.user_id}' AND a.active_flag ="Y" `,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  console.log(res_dt);
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      if (res_dt.msg[0].kundali_file_name) {
        if (res_dt.msg[0].rasi_id > 0 && res_dt.msg[0].nakhatra_id > 0 && res_dt.msg[0].jotok_rasi_id > 0) {
          true;
        } else {
          try {
            var kundali_data = await addKundaliUser(res_dt.msg[0].kundali_file_name)
            await db_Insert('td_user_profile', `rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${res_dt.msg[0].id}`, 1)
          } catch (err) {
            console.log(err);
          }
        }
      } else if (res_dt.msg[0].kundali_file_name == '' || res_dt.msg[0].kundali_file_name == null || res_dt.msg[0].kundali_file_name == undefined) {
        console.log('here');
        try {
          var BirthDate = new Date(res_dt.msg[0].dob).toISOString();
        } catch (err) {
          console.log(err);
        }
        try {
          var kundali_data = await kundali(res_dt.msg[0].id, res_dt.msg[0].latt_long, BirthDate)
          kundali_data.file_name ? await db_Insert('td_user_profile', `kundali_file_name='${kundali_data.file_name}', rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${res_dt.msg[0].id}`, 1) : ''
        } catch (err) {
          console.log(err);
        }
      }
      result = {
        suc: 1,
        msg: "successfully loggedin",
        user_data: res_dt.msg,
      };
    } else {
      result = { suc: 0, msg: "No data found", user_data: null };
    }
  } else {
    result = { suc: 0, msg: res_dt.msg };
  }
  res.send(result);
})

UserRouter.post('/update_pass', async (req, res) => {
  var data = req.body, result;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  console.log(data);
  var select = "id, user_id, password",
    table_name = "md_user_login",
    whr = `profile_id = '${data.user_id}'`,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      if (await bcrypt.compare(data.old_pass, res_dt.msg[0].password)) {
        var pass = bcrypt.hashSync(data.new_pass, 10);
        var table_name = `md_user_login`,
          fields = `password = '${pass}'`,
          whr = `profile_id = ${data.user_id}`,
          flag = 1;
        var forget_pass = await db_Insert(table_name, fields, null, whr, flag)
        result = forget_pass
      } else {
        result = {
          suc: 0,
          msg: "Please provide your correct old password",
          user_data: null,
        };
      }
    } else {
      result = { suc: 0, msg: "No data found", user_data: null };
    }
  } else {
    result = { suc: 0, msg: res_dt.msg };
  }
  res.send(result)
})

UserRouter.post("/birth_details", async (req, res) => {
  var data = req.body;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  console.log(data);

  var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  var table_name = "td_user_profile",
    fields = `dob = '${dateFormat(data.field_birth_date, "yyyy-mm-dd HH:MM:ss")}', location_id = '${data.location_id}', latt_long = '${data.latt_long}', view_flag = 'N', modified_by = '${data.user}', modified_dt = '${datetime}'`,
    values = null,
    whr = `id=${data.user_id}`;
  flag = 1;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);
  if (res_dt.suc > 0) {
    try {
      var BirthDate = new Date(data.field_birth_date).toISOString();
    } catch (err) {
      console.log(err);
    }
    try {
      var kundali_data = await kundali(data.user_id, data.latt_long, BirthDate)
      kundali_data.file_name ? await db_Insert('td_user_profile', `kundali_file_name='${kundali_data.file_name}', rasi_id = '${kundali_data.rasi_id}', nakhatra_id = '${kundali_data.nakhatra_id}', jotok_rasi_id = '${kundali_data.jotok_rasi_id}'`, null, `id=${data.user_id}`, 1) : ''
    } catch (err) {
      console.log(err);
    }
    try {
      var birth_data = await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss"))
    } catch {
      console.log(err);
    }
  }
  res.send(res_dt);
});


module.exports = { UserRouter };
