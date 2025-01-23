const express = require("express"),
  rashiRouter = express.Router(),
  request = require("request"),
  fs = require("fs"),
  path = require("path");

const { db_Select, getAccessTokenMaster } = require("../module/MasterModule");
const { getNakhatra, getJotukRashiId } = require("./MasterRouter");

rashiRouter.get("/planet_position", async (req, res) => {
  var request_data = req.query,
    res_dt;
  if (request_data.user_id > 0) {
    var select = "a.id, a.kundali_file_name, a.location_id, a.location_id location_name",
      table_name = "td_user_profile a",
      whr = `a.id = ${request_data.user_id}`,
      order = null;
    var chk_user = await db_Select(select, table_name, whr, order);
    if (chk_user.suc > 0 && chk_user.msg.length > 0) {
      if (chk_user.msg[0].kundali_file_name) {
        try{
          fs.readFile(path.join('raw_data', chk_user.msg[0].kundali_file_name), 'utf8', (err, jsonData) => {
            try{
              var pData = JSON.parse(jsonData)
              
              var arr = [];
              if (pData.status == "ok") {
                for (let dt of pData.data.planet_position) {
                  
                  var planet = {}
                  planet = {
                    planet_name: dt.name,
                    position: dt.position,
                    degree: dt.degree,
                    rashi_name: dt.rasi.name,
                    lord_name: dt.rasi.lord.name,
                    verdic_name: dt.rasi.lord.vedic_name,
                  };
                  arr.push(planet);
                }
                res_dt = { suc: 1, msg: arr, location_name: chk_user.msg[0].location_name };
                res.send(res_dt)
              } else {
                res_dt = { suc: 0, msg: "error in planet position" };
                res.send(res_dt)
              }
            }catch(err){
              console.log(err);
              res_dt = { suc: 0, msg: err };
              res.send(res_dt)
            }
          })
        }catch(err){
          console.log(err);
          res_dt = { suc: 0, msg: err };
          res.send(res_dt)
        }
      } else {
        res_dt = { suc: 0, msg: "No file found" };
        res.send(res_dt)
      }
    } else {
      res_dt = { suc: 0, msg: "No data found" };
      res.send(res_dt)
    }
  } else {
    res_dt = { suc: 0, msg: "Please provide user id" };
    res.send(res_dt)
  }
});

const kundali = (user_id, coordinates, datetime) => {
  return new Promise(async (resolve, reject) => {
    var ayanamsa = 1,
      lang = "en";
    var accTkn = await getAccessTokenMaster()
    // console.log(accTkn, 'Token');
    var options = {
      method: "GET",
      url: `https://api.prokerala.com/v2/astrology/planet-position?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${datetime}&la=${lang}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accTkn}`,
      },
    };
    request(options, async function (error, response) {
      if (error) {
        throw new Error(error);
      } else {
        var data = JSON.parse(response.body);
        try{
          if(data.status == 'ok'){
            var rasiData = data.data.planet_position.filter(
              (dt) => dt.name == "Moon"
            ), nakhatra_name, jotok_rasi_id;
            var rashiPosData = data.data.planet_position.filter(
              (dt) => dt.position == rasiData[0].position
            )
            if(rashiPosData.length > 1){
              for(let dt of rashiPosData){
                nakhatra_name = await getNakhatra(
                  dt.degree,
                  dt.position
                );
                jotok_rasi_id = await getJotukRashiId(
                  dt.rasi.name,
                  nakhatra_name.msg[0].nakhatra
                );
                if(jotok_rasi_id.suc > 0 && jotok_rasi_id.msg.length > 0){
                  break;
                }
              }
            }else{
              nakhatra_name = await getNakhatra(
                rasiData[0].degree,
                rasiData[0].position
              );
              jotok_rasi_id = await getJotukRashiId(
                rasiData[0].rasi.name,
                nakhatra_name.msg[0].nakhatra
              );
            }
          
            var file_name = user_id + "-" + datetime.split(":").join("-");
            fs.writeFile(
              path.join(__dirname, `../raw_data/${file_name}.json`),
              JSON.stringify(data),
              "utf-8",
              (err) => {
                if (err) resolve(err);
                else
                  resolve({
                    file_name: `${file_name}.json`,
                    rasi_id: parseInt(rasiData[0].rasi.id) + 1,
                    nakhatra_id:
                      nakhatra_name.suc > 0 && nakhatra_name.msg.length > 0
                        ? nakhatra_name.msg[0].nakhatra_id
                        : 0,
                    jotok_rasi_id:
                      jotok_rasi_id.suc > 0 && jotok_rasi_id.msg.length > 0
                        ? jotok_rasi_id.msg[0].id
                        : 0,
                  });
              }
            );
          }else{
            resolve({
              file_name: '',
              rasi_id: 0,
              jotok_rasi_id: 0,
            })
          }
        }catch(err){
          console.log(err);
        }
      }

    });
  });
};

const addKundaliUser = (fileName) => {
  return new Promise(async (resolve, reject) => {
    try{
      fs.readFile(path.join('raw_data', fileName), 'utf8', async (err, jsonData) => {
        try{
          var data = JSON.parse(jsonData)
          
          var rasiData = data.data.planet_position.filter(
            (dt) => dt.name == "Moon"
          ), nakhatra_name, jotok_rasi_id;
          var rashiPosData = data.data.planet_position.filter(
            (dt) => dt.position == rasiData[0].position
          )
          if(rashiPosData.length > 1){
            for(let dt of rashiPosData){
              nakhatra_name = await getNakhatra(
                dt.degree,
                dt.position
              );
              jotok_rasi_id = await getJotukRashiId(
                dt.rasi.name,
                nakhatra_name.msg[0].nakhatra
              );
              if(jotok_rasi_id.suc > 0 && jotok_rasi_id.msg.length > 0){
                break;
              }
            }
          }else{
            nakhatra_name = await getNakhatra(
              rasiData[0].degree,
              rasiData[0].position
            );
            jotok_rasi_id = await getJotukRashiId(
              rasiData[0].rasi.name,
              nakhatra_name.msg[0].nakhatra
            );
          }
          resolve({
            rasi_id: parseInt(rasiData[rasiData.findIndex(dt=> dt.name == "Moon")].rasi.id) + 1,
            nakhatra_id:
              nakhatra_name.suc > 0 && nakhatra_name.msg.length > 0
                ? nakhatra_name.msg[0].nakhatra_id
                : 0,
            jotok_rasi_id:
              jotok_rasi_id.suc > 0 && jotok_rasi_id.msg.length > 0
                ? jotok_rasi_id.msg[0].id
                : 0,
          });
        }catch(err){
          console.log(err);
          resolve(err)
        }
      })
    }catch(err){
      console.log(err);
      resolve(err)
    }
  })
}

module.exports = { rashiRouter, kundali, addKundaliUser };
