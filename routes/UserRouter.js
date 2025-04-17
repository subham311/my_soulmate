const { ConfirmEmail } = require("../module/EmailModule");
const {
  ActiveProf,
  DeActiveProf,
  ActiveKyc,
  DeActiveKyc,
  ActiveStatus,
  DeActiveStatus,
} = require("../module/SMSModule");
const {
  getUserList,
  user_groom_loc,
  user_basic_info,
  user_hobbies,
  userProfile,
  user_multiImg,
  user_Doc,
  user_Doc_File,
  getActive,
  getProfileVerify,
  getPayflag,
  getList,
  PaymentHistory,
  get_hobby,
  editData,
  getEditData,
  getAllEditData,
  EditData,
  storeDeletedata,
  total_amount,
} = require("../module/UserModule");
const {
  field_height,
  field_weight,
  field_marital_status,
  field_Eating_Habits,
  field_Drinking_Habits,
  field_Smoking_Habits,
  field_Religion,
  field_Employed_in,
  field_family_value,
  field_family_type,
  field_family_status,
  field_Family_Location,
  field_Father_Occupation,
  field_Mother_Occupation,
  field_No_Brother,
  field_No_Sister,
  hobbies_tb_data,
  ac_for,
  field_disability,
  field_body_type,
  field_gender,
} = require("../module/dynamicData");

const express = require("express"),
  userRouter = express.Router();
dateFormat = require("dateformat");

userRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

userRouter.get("/dashboard", function (req, res) {
  // res.send('Welcome to Admin panel');
  res.render("dashboard/index");
});

userRouter.get("/user_list", async (req, res) => {
  var userList = await getUserList();
  res.render("user/user_datatable", {
    data: userList.suc > 0 ? userList.msg : [],
  });
});

userRouter.get("/payment_history", async (req, res) => {
  var res_dt = await PaymentHistory();
  res.render("user/pay_history", { 
    data: res_dt.suc > 0 ? res_dt.msg : [] });
});

userRouter.get("/total_amount", async (req, res) => {
  var res_dt = await total_amount();
  res.send(res_dt)
//  res.render("user/pay_history", {
//   data : res_dt.suc > 0 ? res_dt.msg : [] });
});

userRouter.get("/edit_user", async (req, res) => {
  var edit_userList = await editData();
  res.render("user/edit_user_datatable", {
    data: edit_userList.suc > 0 ? edit_userList.msg : [],
  });
});

// userRouter.get("/edit_user", async (req, res) => {
//   res.render("user/edit");
// })

userRouter.get("/view_user", async (req, res) => {
  var id = req.query.id;
  var groomLocation = await user_groom_loc({ user_id: id });
  var userBasicInfo = await user_basic_info({ user_id: id });
  var hobbies = await get_hobby({ user_id: id });
  console.log(hobbies);
  // var hobbies = await user_hobbies({ user_id: id });
  var profile_img = await userProfile({ user_id: id });
  var multiple_photo = await user_multiImg({ user_id: id });
  var doc_type = await user_Doc({ id });
  var doc_file = await user_Doc_File({ user_id: id });
  var data = {
    groom_loc: groomLocation.suc > 0 ? groomLocation.msg : [],
    basic_info: userBasicInfo.suc > 0 ? userBasicInfo.msg : [],
    hobbies: hobbies.suc > 0 ? hobbies.msg : [],
    profile_img: profile_img.suc > 0 ? profile_img.msg : [],
    multiple_photo: multiple_photo.suc > 0 ? multiple_photo.msg : [],
    doc_type: doc_type.suc > 0 ? doc_type.msg : [],
    doc_file: doc_file.suc > 0 ? doc_file.msg : [],
    ac_for: ac_for,
    gender: field_gender,
    height: field_height,
    weight: field_weight,
    bod_type: field_body_type,
    mari_status: field_marital_status,
    eat_hab: field_Eating_Habits,
    dri_hab: field_Drinking_Habits,
    smoke_hab: field_Smoking_Habits,
    disable: field_disability,
    religion: field_Religion,
    emp_in: field_Employed_in,
    fam_value: field_family_value,
    fam_type: field_family_type,
    fam_status: field_family_status,
    fam_loc: field_Family_Location,
    father_occ: field_Father_Occupation,
    mother_occ: field_Mother_Occupation,
    no_of_bro: field_No_Brother,
    no_of_sis: field_No_Sister,
    id,
  };
  res.render("user/view", data);
});


userRouter.get("/edit_user_list", async (req, res) => {
  var id = req.query.id;
  var groomLocation = await user_groom_loc({ user_id: id });
  var userBasicInfo = await user_basic_info({ user_id: id });
  var hobbies = await get_hobby({ user_id: id });
  // console.log(hobbies);
  // var hobbies = await user_hobbies({ user_id: id });
  var profile_img = await userProfile({ user_id: id });
  var multiple_photo = await user_multiImg({ user_id: id });
  var doc_type = await user_Doc({ id });
  var doc_file = await user_Doc_File({ user_id: id });
  var editDataList = await getAllEditData(id)
  var data = {
    groom_loc: groomLocation.suc > 0 ? groomLocation.msg : [],
    basic_info: userBasicInfo.suc > 0 ? userBasicInfo.msg : [],
    hobbies: hobbies.suc > 0 ? hobbies.msg : [],
    profile_img: profile_img.suc > 0 ? profile_img.msg : [],
    multiple_photo: multiple_photo.suc > 0 ? multiple_photo.msg : [],
    doc_type: doc_type.suc > 0 ? doc_type.msg : [],
    doc_file: doc_file.suc > 0 ? doc_file.msg : [],
    edit_data: editDataList.suc > 0 ? editDataList.msg : [],
    ac_for: ac_for,
    gender: field_gender,
    height: field_height,
    weight: field_weight,
    bod_type: field_body_type,
    mari_status: field_marital_status,
    eat_hab: field_Eating_Habits,
    dri_hab: field_Drinking_Habits,
    smoke_hab: field_Smoking_Habits,
    disable: field_disability,
    religion: field_Religion,
    emp_in: field_Employed_in,
    fam_value: field_family_value,
    fam_type: field_family_type,
    fam_status: field_family_status,
    fam_loc: field_Family_Location,
    father_occ: field_Father_Occupation,
    mother_occ: field_Mother_Occupation,
    no_of_bro: field_No_Brother,
    no_of_sis: field_No_Sister,
    id,
  };
  res.render("user/edit", data);
});

userRouter.post("/update_profile_verify", async (req, res) => {
  var data = req.body;
  var res_dt = await getProfileVerify(data);
  switch (data.flag) {
    case "Y":
      await ActiveKyc(data.phone, data.pro_id);
      break;
    case "N":
      await DeActiveKyc(data.phone, data.pro_id);
      break;

    default:
      break;
  }
  res.send(res_dt);
});

userRouter.post("/update_pay_flag", async (req, res) => {
  var data = req.body;
  flag = req.body.payflag;
  var res_dt = await getUserList(flag);
  res.send(res_dt);
});

userRouter.post("/update_active_flag", async (req, res) => {
  var data = req.body;
  var res_dt = await getList(data.id);
  var active_dt = await getActive(data);
  if (active_dt.suc > 0) {
    switch (data.flag) {
      case "Y":
        await ActiveStatus(
          res_dt.msg[0].profile_id,
          res_dt.msg[0].email_id,
          res_dt.msg[0].u_name
        );
        await ActiveProf(res_dt.msg[0].phone_no, res_dt.msg[0].profile_id);
        break;
      case "N":
        await DeActiveStatus(
          res_dt.msg[0].profile_id,
          res_dt.msg[0].email_id,
          res_dt.msg[0].u_name
        );
        await DeActiveProf(res_dt.msg[0].phone_no, res_dt.msg[0].profile_id);
        break;
      default:
        break;
    }
  }
  res.send(res_dt);
});

userRouter.post("/update_view_flag", async (req, res) =>{
 var data = req.body;
 var chk_flag = await EditData(data) ;
 data.flag != 'U' ? await ConfirmEmail(data.email, data.user_name) : ''
 res.send(chk_flag);
});

userRouter.post("/delete", async (req, res) => {
  var data = req.body;
  // console.log(data);
  var res_dt = await storeDeletedata(data);
  res.redirect('/user/user_list');
});

userRouter.post("/confirm_email", async (req, res) => {
  var data = req.body;
  console.log(data);
  var res_dt = await ConfirmEmail(data.email_id,data.user_name)
  if(res_dt.suc > 0){
    res.send({suc:1, msg: 'Email sent successfully'})
}else {
  res.send({suc:0, msg: 'Email not sent'})
}
})

module.exports = { userRouter };
