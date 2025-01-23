const express = require("express"),
  ProfileRouter = express.Router(),
  dateFormat = require("dateformat"),
  fileUpload = require("express-fileupload"),
  path = require("path");
fs = require('fs');
const request = require('request');
const bcrypt = require('bcrypt')

const { fileExtLimiter } = require("../middleware/fileExtLimiter");
const { fileSizeLimiter } = require("../middleware/fileSizeLimiter");
const { filePayloadExists } = require("../middleware/filesPayloadExists");
const {
  db_Select,
  EncryptDataToSend,
  db_Insert,
  db_Delete,
  Encrypt,
  updateStatus,
  updateViewFlag,
} = require("../module/MasterModule");
const {
  user_groom_loc,
  user_basic_info,
  user_hobbies,
  user_contact_details,
  get_hobby,
  get_email,
} = require("../module/ProfileModule");
const { getOtp } = require("../module/SmsModule");
const { SendVerifyEmail, ActiveEmail, ContactUserEmail, SendForgetPwdEmail, SendPaymentEmail } = require("../module/EmailModule");
const { reqEncrypt } = require("../module/ccavutil");

ProfileRouter.get("/user_groom_loc", async (req, res) => {
  var data = req.query;
  var res_dt = await user_groom_loc(data);
  res_dt = await EncryptDataToSend(res_dt);
  res.send(res_dt);
});

ProfileRouter.get("/user_basic_info", async (req, res) => {
  var data = req.query;
  var res_dt = await user_basic_info(data, true);
  res_dt = await EncryptDataToSend(res_dt);
  res.send(res_dt);
});

ProfileRouter.get("/user_contact_details", async (req, res) => {
  var data = req.query;
  var res_dt = await user_basic_info(data);
  res_dt = await EncryptDataToSend(res_dt);
  res.send(res_dt);
});

ProfileRouter.post("/user_contact_details", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select = 'email_id',
    table_name = "td_user_profile",
    whr = `id = ${data.user_id}`,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var email_flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? (chk_dt.msg[0].email_id == data.field_email_id ? '' : `,email_approved_flag = 'N'`) : ''
  var table_name = "td_user_profile",
    fields = `email_id= '${data.field_email_id}' ${email_flag}, view_flag = 'N', modified_by = '${data.user_name}', modified_dt = '${datetime}'`,
    values = null,
    whr = `id = ${data.user_id}`,
    flag = 1;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var contact_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  res.send(res_dt);
});

ProfileRouter.post("/user_basic_info", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);

  var table_name = "td_user_profile",
    fields =
      data.user_id > 0
        ? `ac_for = '${data.field_who_creat_profile}', gender = '${data.field_gender}', mother_tong = '${data.field_mother_tong}', view_flag = 'N', modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(phone_no, ac_for, gender, mother_tong, created_by, created_dt)",
    values = `('${data.field_mobile}', '${data.field_who_creat_profile}', '${data.field_gender}', '${data.field_mother_tong}', '${data.user}', '${datetime}')`,
    whr = data.user_id > 0 ? `id = ${data.user_id}` : null,
    flag = data.user_id > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var basic_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  if (res_dt.suc > 0) {
    var select = "id",
      table_name = "td_user_p_dtls",
      whr = `user_id = ${data.user_id}`,
      order = null;
    var chk_dt = await db_Select(select, table_name, whr, order);

    var table_name = "td_user_p_dtls",
      fields =
        chk_dt.suc > 0 && chk_dt.msg.length > 0
          ? `marital_status = '${data.field_marital_status}', height = '${data.field_height}', weight = '${data.field_weight}', disability_flag = '${data.field_disability}', body_type = '${data.field_body_type}', drinking_habbits = '${data.field_Drinking_Habits}', age = '${data.field_age}', eating_habbits = '${data.field_Eating_Habits}', smoking_habbits = '${data.field_Smoking_Habits}', modified_by = '${data.user}', modified_dt = '${datetime}'`
          : "(user_id, marital_status, height, weight, disability_flag, body_type, drinking_habbits, age, eating_habbits, smoking_habbits, created_by, created_dt)",
      values = `('${data.user_id}', '${data.field_marital_status}', '${data.field_height}', '${data.field_weight}', '${data.field_disability}', '${data.field_body_type}', '${data.field_Drinking_Habits}', '${data.field_age}', '${data.field_Eating_Habits}', '${data.field_Smoking_Habits}', '${data.user}', '${datetime}')`,
      whr =
        chk_dt.suc > 0 && chk_dt.msg.length > 0
          ? `id = ${chk_dt.msg[0].id}`
          : null,
      flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
    res_dt = await db_Insert(table_name, fields, values, whr, flag);
  }
  res.send(res_dt);
});

ProfileRouter.post("/user_groom_loc", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select = "id",
    table_name = "td_user_profile",
    whr = `id = ${data.user_id}`,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var table_name = "td_user_profile",
    fields =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `country_id = '${data.field_Country}', state_id = '${data.field_State > 0 ? data.field_State : 0}', view_flag = 'N', modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(country_id, state_id,created_by, created_dt)",
    values = `('${data.field_Country}', '${data.field_State > 0 ? data.field_State : 0}', 0, '${data.user}', '${datetime}')`,
    whr =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `id = ${chk_dt.msg[0].id}`
        : null,
    flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var groom_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  res.send(res_dt);
});

ProfileRouter.post("/user_prof_info", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select = "id",
    table_name = "td_user_education",
    whr = `user_id = ${data.user_id}`,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var table_name = "td_user_education",
    fields =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `heigh_education = '${data.field_highest_education}', emp_type = '${data.field_employed}', occup = '${data.field_Occupation}', collage = "${data.field_College}", org_name = "${data.field_Organization}", income = '${data.field_Annual_Income}', work_location = "${data.work_location}", modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(user_id, heigh_education, emp_type, occup, collage, org_name, income, work_location, created_by, created_dt)",
    values = `('${data.user_id}', '${data.field_highest_education}', '${data.field_employed}', '${data.field_Occupation}', 0, "${data.field_College}", 0, "${data.field_Organization}", '${data.field_Annual_Income}', "${data.work_location}", '${data.user}', '${datetime}')`,
    whr =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `id = ${chk_dt.msg[0].id}`
        : null,
    flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var flag = await updateViewFlag(data.user_id)
    var professional_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  res.send(res_dt);
});

ProfileRouter.post("/family_dtls", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select = "id",
    table_name = "td_user_p_dtls",
    whr = data.user_id > 0 ? `user_id = ${data.user_id}` : null,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var table_name = "td_user_p_dtls",
    fields =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `family_status = "${data.field_family_status}", family_type = "${data.field_family_type}", family_values = "${data.field_family_value}", no_sister = "${data.field_No_Sister}", no_brother = "${data.field_No_Brother}", father_occupation = "${data.field_Father_Occupation}", mother_occupation = "${data.field_Mother_Occupation}", family_location = "${data.field_Family_Location}", modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(user_id, family_status, family_type, family_values, no_sister, no_brother, father_occupation, mother_occupation, family_location, created_by, created_dt)",
    values = `('${data.user_id}', '${data.field_family_status}', '${data.field_family_type}', '${data.field_family_value}', '${data.field_No_Sister}', '${data.field_No_Brother}', '${data.field_Father_Occupation}', '${data.field_Mother_Occupation}', '${data.field_Family_Location}', '${data.user}', '${datetime}')`,
    whr =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `id = ${chk_dt.msg[0].id}`
        : null,
    flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var flag_1 = await updateViewFlag(data.user_id)
    var family_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }
  res.send(res_dt);
});

ProfileRouter.post("/about_family", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var select = "id",
    table_name = "td_user_p_dtls",
    whr = `user_id = ${data.user_id}`,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var table_name = "td_user_p_dtls",
    fields =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `about_my_family = "${data.field_About_My_Family}", modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(user_id, about_my_family, created_by, created_dt)",
    values = `('${data.user_id}', '${data.field_About_My_Family}', '${data.user}', '${datetime}')`,
    whr =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `id = ${chk_dt.msg[0].id}`
        : null,
    flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var flag_2 = await updateViewFlag(data.user_id)
    var about_data = data.edite_Flag > 0 ? await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss")) : ''
  }

  res.send(res_dt);
});

ProfileRouter.get("/user_hobbies", async (req, res) => {
  var data = req.query,
    hobbie_data = {},
    res_dt;
  res_dt = await user_hobbies(data);
  res_dt = await EncryptDataToSend(res_dt);
  res.send(res_dt);
});

ProfileRouter.post("/user_hobbies", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
    res_dt;

  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  // console.log(data);

  var hobbies_tb_data = [
    {
      field_name: "hobbies_interest",
      table_name: "td_user_hobbies_int",
      input_field: "field_Hobbies_Interests",
    },
    {
      field_name: "music_name",
      table_name: "td_user_hobbies_music",
      input_field: "field_Music",
    },
    {
      field_name: "sports_name",
      table_name: "td_user_hobbies_sports",
      input_field: "field_Sports",
    },
    {
      field_name: "movie_name",
      table_name: "td_user_hobbies_movies",
      input_field: "field_Preferred_Movies",
    },
    {
      field_name: "lang_name",
      table_name: "td_user_hobbies_lang",
      input_field: "field_Spoken_Languages",
    },
  ];

  for (let dt of hobbies_tb_data) {
    let a = '';
    for (let idt of data[dt.input_field]) {
      if (a != '') {
        a = `${a}, '${idt}'`
      } else {
        a = `'${idt}'`
      }
    }
    try {
      if (data[dt.input_field].length > 0) {
        await db_Delete(dt.table_name, `user_id = ${data.user_id} AND ${dt.field_name} NOT IN(${a})`)
      }
    } catch (err) {
      console.log(err);
    }
    for (let hdt of data[dt.input_field]) {
      try {
        var select = "id",
          table_name = `${dt.table_name}`,
          whr = `user_id = ${data.user_id} AND ${dt.field_name} = '${hdt}'`,
          order = null;
        var chk_dt = await db_Select(select, table_name, whr, order);

        var table_name = `${dt.table_name}`,
          fields =
            chk_dt.suc > 0 && chk_dt.msg.length > 0
              ? `${dt.field_name} = '${hdt}', modified_by = '${data.user}', modified_dt = '${datetime}'`
              : `(user_id, ${dt.field_name}, created_by, created_dt)`,
          values = `('${data.user_id}', '${hdt}', '${data.user}', '${datetime}')`,
          whr =
            chk_dt.suc > 0 && chk_dt.msg.length > 0
              ? `id = ${chk_dt.msg[0].id}`
              : null,
          flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
        res_dt = await db_Insert(table_name, fields, values, whr, flag);
      } catch (err) {
        console.log(err);
      }
    }
  }
  res.send(res_dt);
});

ProfileRouter.get("/profile_pic", async (req, res) => {
  var data = req.query;
  var select = "id, file_path",
    table_name = "td_user_profile",
    whr = data.user_id > 0 ? `id = ${data.user_id}` : null,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  res.send({
    suc: 1,
    msg: Buffer.from(JSON.stringify(res_dt.msg), "utf8").toString("base64"),
  });
});

ProfileRouter.post(
  "/upload_profile_pic",
  fileUpload({ crereateParentPath: true }),
  filePayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  async (req, res) => {
    var data = req.body,
      files = req.files,
      datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
      res_dt;

    var dir = 'assets/uploads',
      file_dir = `${dir}/${data.user_id}`;
    if (!fs.existsSync(file_dir)) {
      fs.mkdirSync(file_dir);
    }
    const filepath = path.join(file_dir, files["profile_img"].name),
      fileName = `${data.user_id}/${files["profile_img"].name}`;
    files["profile_img"].mv(filepath, async (err) => {
      if (err) {
        res.status(500).send({ status: 0, message: err });
      } else {
        var table_name = "td_user_profile",
          fields = `file_path = '${fileName}', view_flag = 'N', modified_by = '${data.user}', modified_dt = '${datetime}'`,
          values = null,
          whr = `id= '${data.user_id}'`,
          flag = 1;
        res_dt = await db_Insert(table_name, fields, values, whr, flag);
        if (res_dt.suc > 0) {
          await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss"))
        }

        res.send(res_dt);
      }
    });
  }
);

ProfileRouter.post("/update_payStatus", async (req, res) => {
  var res_dt = req.body,

    res_dt = Buffer.from(res_dt.data, "base64").toString();
  res_dt = JSON.parse(res_dt);

  var table_name = `td_user_profile`,
    fields = `pay_flag = '${res_dt.pay_flag}',plan_id = '${res_dt.plan_id}'`,
    whr = `id = ${res_dt.user_id}`,
    flag = 1;
  var payStatus = await db_Insert(table_name, fields, null, whr, flag);

  var table_name = `md_user_login`,
    fields = `pay_status = '${res_dt.pay_flag}'`,
    whr = `profile_id = ${res_dt.user_id}`,
    flag = 1;
  var payStatus = await db_Insert(table_name, fields, null, whr, flag);
  res.send(payStatus);
});

ProfileRouter.get("/check_mobile_no", async (req, res) => {
  var data = req.query, result;
  var select = 'id, phone_no',
    table_name = 'td_user_profile',
    whr = `phone_no = '${data.phone_no}'`,
    order = null;
  try {
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0) {
      if (res_dt.msg.length > 0) {
        result = { suc: 2, msg: "Phone number is already exists" }
      } else {
        result = { suc: 1, msg: "Please enter phone number" }
      }
    } else {
      result = res_dt
    }
  } catch (err) {
    result = { suc: 0, msg: "No phone number found" }
  }
  res.send(result);
});

ProfileRouter.get("/check_email", async (req, res) => {
  var data = req.query, result;

  var select = 'id, email_id',
    table_name = 'td_user_profile',
    whr = `email_id = '${data.email_id}'`,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order);
  if (res_dt.suc > 0) {
    if (res_dt.msg.length > 0) {
      result = { suc: 2, msg: "Email already exists!!" }
    } else {
      result = { suc: 1, msg: "Please enter Email ID" }
    }
  } else {
    result = res_dt
  }
  res.send(result);
});


ProfileRouter.post("/send_otp", async (req, res) => {
  var data = req.body;
  var otp_dt = await getOtp(data);
  res.send({ suc: 1, msg: 'Otp Sent', otp: await Encrypt(otp_dt.otp.toString()) });
});

ProfileRouter.get("/hobby", async (req, res) => {
  var data = req.query;
  var res_dt = await get_hobby(data);
  res_dt = await EncryptDataToSend(res_dt);
  res.send(res_dt);
});


ProfileRouter.post("/update_hobby", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);

  var select = "id",
    table_name = "td_user_hobbies",
    whr = `user_id = ${data.user_id}`,
    order = null;
  var chk_dt = await db_Select(select, table_name, whr, order);

  var table_name = "td_user_hobbies",
    fields =
      chk_dt.suc > 0 && chk_dt.msg.length > 0
        ? `hobbies_interest = "${data.field_hobbies_interest}", sports = "${data.field_sports}", fav_music = "${data.field_fav_music}", movie = "${data.field_movie}", modified_by = '${data.user}', modified_dt = '${datetime}'`
        : "(user_id,hobbies_interest, sports,fav_music, movie, created_by, created_dt)",
    values = `('${data.user_id}', "${data.field_hobbies_interest}", "${data.field_sports}","${data.field_fav_music}", "${data.field_movie}", '${data.user}', '${datetime}')`,
    whr = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? `user_id = ${data.user_id}` : null,
    flag = chk_dt.suc > 0 && chk_dt.msg.length > 0 ? 1 : 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);

  if (res_dt.suc > 0) {
    var flag_3 = await updateViewFlag(data.user_id)
    var hobbies_data = await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss"))
  }
  res.send(res_dt);
});

ProfileRouter.post("/verify_email", async (req, res) => {
  var data = req.body;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var otp = Math.floor(1000 + Math.random() * 9000);

  var verifyEmail = await SendVerifyEmail(otp, data.email_id, data.profile_id, data.user_name);
  if (verifyEmail.suc > 0) {
    res.send({ suc: 1, msg: 'OTP has been Sent to your registered email id', otp: await Encrypt(otp.toString()) });
  } else {
    res.send({ suc: 0, msg: 'OTP has not been Sent to your registered email id', otp: 0 })
  }
});

ProfileRouter.post("/update_email_flag", async (req, res) => {
  var data = req.body,
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  var table_name = `td_user_profile`,
    fields = `email_approved_flag = 'Y', modified_by = '${data.user_name}', modified_dt = '${datetime}'`,
    values = null,
    whr = `id = ${data.user_id}`,
    flag = 1;
  var ActiveStatus = await db_Insert(table_name, fields, values, whr, flag);
  res.send(ActiveStatus);
});

ProfileRouter.post("/search_email", async (req, res) => {
  var data = req.body;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  var ContactEmail = await ContactUserEmail(data.id, data.profile_id, data.user_name, data.frm_email, data.to_email);
  if (ContactEmail.suc > 0) {
    res.send({ suc: 1, msg: 'Email sent successfully' })
  } else {
    res.send({ suc: 0, msg: 'Email not sent' })
  }
});

ProfileRouter.post("/payment_email", async (req, res) => {
  var data = req.body;
  var PaymentEmail = await SendPaymentEmail(data.email_id, data.user_name, data.order_id, data.pay_name, data.amount, data.tennure_month);
  if (PaymentEmail.suc > 0) {
    res.send({ suc: 1, msg: 'Email sent successfully' })
  } else {
    res.send({ suc: 0, msg: 'Email not sent' })
  }
});

module.exports = { ProfileRouter };
