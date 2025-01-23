const express = require('express'),
  KycRouter = express.Router(),
  request = require("request"),
  dateFormat = require("dateformat"),
  fileUpload = require("express-fileupload"),
  fs = require('fs'),
  path = require('path');

const { aadhar_okyc_send_otp, aadhar_okyc_verify, pan_okyc_verify } = require('../module/KycModule');
const { db_Select, db_Delete, updateViewFlag, updateStatus } = require('../module/MasterModule');
const { db_Insert } = require('../module/MasterModule');

KycRouter.get('/doc_list', async (req, res) => {
  var data = req.query
  console.log(data);
  var select = 'id, doc_type',
    table_name = 'md_document',
    whr = data.id > 0 ? `id = ${id}` : null,
    order = 'ORDER BY doc_type';
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send({ suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64') })
})

KycRouter.get('/get_profile_pic', async (req, res) => {
  var data = req.query
  var select = 'id, file_path',
    table_name = 'td_user_profile_image',
    whr = data.user_id > 0 ? `user_id = ${data.user_id}` : null,
    order = 'ORDER BY id';
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send({ suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64') })
})

KycRouter.post('/profile_pic',
  fileUpload({ crereateParentPath: true }), (req, res) => {
    var data = req.body, res_dt;
    console.log(data);
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded...');
    }

    var dir = 'assets/uploads',
      sub_dir = `${dir}/${data.user_id}`;
    if (!fs.existsSync(sub_dir)) {
      fs.mkdirSync(sub_dir);
    }

    // Loop through uploaded files
    for (let fileKey in req.files) {
      const file = req.files[fileKey];

      if (Array.isArray(file)) {
        for (let fl of file) {
          var uploadPath = path.join(sub_dir, `${data.user_id}_${fl.name}`)
          fl.mv(uploadPath, async function (err) {
            if (err) {
              res_dt = { suc: 0, msg: err }// res.status(500).send(err);
            } else {
              let fileName = `${data.user_id}/${data.user_id}_${fl.name}`
              var table_name = 'td_user_profile_image',
                fields = '(user_id, file_path, created_by, created_dt)',
                values = `('${data.user_id}','${fileName}', '${data.user}', '${datetime}')`,
                whr = null,
                flag = 0;
              res_dt = await db_Insert(table_name, fields, values, whr, flag)
              if (res_dt.suc > 0) {
                await updateViewFlag(data.user_id)
                await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss"))
              }
            }

          });
        }
      } else {
        var uploadPath = path.join(sub_dir, `${data.user_id}_${file.name}`)
        file.mv(uploadPath, async function (err) {
          if (err) {
            console.log(err);
            res_dt = { suc: 0, msg: err };
          } else {
            let fileName = `${data.user_id}/${data.user_id}_${file.name}`
            var table_name = 'td_user_profile_image',
              fields = '(user_id, file_path, created_by, created_dt)',
              values = `('${data.user_id}','${fileName}', '${data.user}', '${datetime}')`,
              whr = null,
              flag = 0;
            res_dt = await db_Insert(table_name, fields, values, whr, flag)
            console.log(res_dt);
            if (res_dt.suc > 0) {
              await updateViewFlag(data.user_id)
              await updateStatus(data.user_id, data.edite_Flag, 'U', data.user, dateFormat(data.timeStamp, "yyyy-mm-dd HH:MM:ss"))
            }
          }
        });
      }
    }
    res.send({ suc: 1, msg: 'Uploaded' });
  });

KycRouter.get("/single_pic_delete", async (req, res) => {
  var data = req.query
  // console.log(data);
  var table_name = 'td_user_profile_image',
    whr = `id=${data.id}`
  var res_dt = await db_Delete(table_name, whr)
  res.send(res_dt)
});

KycRouter.post('/aadhar_okyc_send_otp', async (req, res) => {
  var data = req.body,
    result;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  if (data.aadhaar) {
    result = await aadhar_okyc_send_otp(data.aadhaar)
    if (result.status) {
      if (result.status == 'SUCCESS')
        result = { suc: 1, msg: result }
      else
        result = { suc: 0, msg: result }
    } else {
      result = { suc: 0, msg: result }
    }
  } else {
    result = { suc: 0, msg: 'No Aadhar Number Found' }
  }
  res.send(result)
})

KycRouter.post('/aadhar_okyc_verify', async (req, res) => {
  var data = req.body,
    result;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  if (data.ref_id && data.otp) {
    result = await aadhar_okyc_verify(data.ref_id, data.otp)
    if (result.status) {
      result = { suc: 1, msg: result }
    } else {
      result = { suc: 0, msg: result }
    }
  } else {
    result = { suc: 0, msg: 'No Ref Number found' }
  }
  res.send(result)
})

KycRouter.post('/pan_okyc_verify', async (req, res) => {
  var data = req.body,
    result;
  data = Buffer.from(data.data, "base64").toString();
  data = JSON.parse(data);
  console.log(data);
  if (data.pan) {
    result = await pan_okyc_verify(data.pan)
    if (result.suc > 0) {
      result = { suc: 1, msg: result.msg }
    } else {
      result = { suc: 0, msg: result.msg }
    }
  } else {
    result = { suc: 0, msg: 'No Pan Number found' }
  }
  res.send(result)
})

KycRouter.post("/update_kyc_flag", async (req, res) => {
  var data = req.body;
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
  var table_name = `td_user_profile`,
    fields = `kyc_type= '${data.field_kyc_type}', profile_verify_flag = 'Y', modified_by = '${data.user_name}', modified_dt = '${datetime}'`,
    values = null,
    whr = `id = ${data.user_id}`,
    flag = 1;
  var KycStatus = await db_Insert(table_name, fields, values, whr, flag);
  res.send(KycStatus);
});

module.exports = { KycRouter }