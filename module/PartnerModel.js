const dateFormat = require("dateformat"),
  fs = require('fs'),
  path = require('path');
const {
  db_Select,
  SunshineMatch,
  NumberMatch,
  globalValues,
  ElementoryField,
  MongalField,
  MoonShineNotMatchField,
} = require("./MasterModule");

const partner_match = (dob) => {
  return new Promise(async (resolve, reject) => {
    var select = `a.rashi_id, b.rashi`,
      table_name = `md_sunshine_rashi a LEFT JOIN md_rashi_pos b ON a.rashi_id = b.position`,
      whr = `STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', frm_month, '-', frm_date), '%Y-%m-%d') <= '${dateFormat(
        new Date(),
        "yyyy"
      )}-${dateFormat(
        dob,
        "mm-dd"
      )}' AND STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', to_month, '-', to_date), '%Y-%m-%d') >= '${dateFormat(
        new Date(),
        "yyyy"
      )}-${dateFormat(dob, "mm-dd")}'`,
      order = null;
    var partner_match_dt = await db_Select(select, table_name, whr, order);
    resolve(partner_match_dt);
  });
};

const RashiMatch = (own_rashi, partner_rashi) => {
  return new Promise(async (resolve, reject) => {
    var select = `match_flag`,
      table_name = `md_rashi_match_frndsp`,
      whr = `frm_rashi_id = ${own_rashi} AND to_rashi_id = ${partner_rashi}`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0 && res_dt.msg.length > 0) {
      var marks = SunshineMatch[res_dt.msg[0].match_flag];
      resolve(marks);
    } else {
      var select = `match_flag`,
        table_name = `md_rashi_match_frndsp`,
        whr = `frm_rashi_id = ${partner_rashi} AND to_rashi_id = ${own_rashi}`,
        order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      var marks =
        res_dt.suc > 0 && res_dt.msg.length > 0
          ? SunshineMatch[res_dt.msg[0].match_flag]
          : 0;
      resolve(marks);
    }
  });
};

const NumberMatchWithDate = (ownDate, partnerDate) => {
  return new Promise(async (resolve, reject) => {
    var select = `frnd_flag`,
      table_name = `md_frndsp_btwn_number`,
      whr = `frm_number = ${ownDate} AND to_number = ${partnerDate}`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0 && res_dt.msg.length > 0) {
      var marks = NumberMatch[res_dt.msg[0].frnd_flag];
      resolve(marks);
    } else {
      var select = `frnd_flag`,
        table_name = `md_frndsp_btwn_number`,
        whr = `frm_number = ${partnerDate} AND to_number = ${ownDate}`,
        order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      var marks =
        res_dt.suc > 0 && res_dt.msg.length > 0
          ? NumberMatch[res_dt.msg[0].frnd_flag]
          : 0;
      resolve(marks);
    }
  });
};

const JotokMatch = (hus_rasi_id, wif_rasi_id) => {
  return new Promise(async (resolve, reject) => {
    var select = `marks`,
      table_name = `md_jotok_chakra`,
      whr = `hus_jotok_rasi_id = ${hus_rasi_id} AND wife_jotok_rasi_id = ${wif_rasi_id}`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0 && res_dt.msg.length > 0) {
      var marks = res_dt.msg[0].marks;
      if (marks <= 36 && marks >= 30) {
        result = 20;
      } else if (marks <= 30 && marks >= 25) {
        result = 15;
      } else if (marks <= 25 && marks >= 20) {
        result = 10;
      } else if (marks <= 20 && marks >= 18) {
        result = 8;
      } else {
        result = 0;
      }
      resolve(result);
    } else {
      var select = `marks`,
        table_name = `md_jotok_chakra`,
        whr = `hus_jotok_rasi_id = ${wif_rasi_id} AND wife_jotok_rasi_id = ${hus_rasi_id}`,
        order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      var marks =
        res_dt.suc > 0 && res_dt.msg.length > 0 ? res_dt.msg[0].marks : 0;
      if (marks >= 36 && marks <= 30) {
        result = 20;
      } else if (marks >= 30 && marks <= 25) {
        result = 15;
      } else if (marks >= 25 && marks <= 20) {
        result = 10;
      } else if (marks >= 20 && marks <= 18) {
        result = 8;
      } else {
        result = 0;
      }
      resolve(result);
    }
  });
};

const ElementMatch = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path.join('raw_data', filePath), 'utf8', (err, jsonData) => {
        try {
          var pData = JSON.parse(jsonData), result = [], elementVal = [];

          if (pData.status == "ok") {
            var planet_data = pData.data.planet_position;
            var asc_pos = planet_data.filter((dt) => dt.name == "Ascendant")
            asc_pos = asc_pos.length > 0 ? asc_pos[0].position : 0

            for (let dt of planet_data) {
              dt.position = dt.position >= asc_pos ? ((dt.position - asc_pos) + 1) : ((12 + dt.position) - asc_pos) + 1
            }
            var planetPositions = [...planet_data.map(dt => dt.position)]
            planetPositions = [...new Set(planetPositions)]
            for (let dt of planetPositions) {
              result.push({
                pos: dt,
                no_of_planet: planet_data.filter(
                  (pdt) => pdt.position == dt && pdt.name != "Ascendant"
                ).length,
              });
            }

            for (dt of ElementoryField) {
              var eleObj = {},
                totPla = 0;
              for (rdt of result) {
                if (dt.fields.includes(rdt.pos)) {
                  totPla += rdt.no_of_planet;
                }
              }
              eleObj[dt.flag] = totPla;
              elementVal.push({ flag: dt.flag, marks: totPla }); ``
            }
            var maxValue = Math.max(...elementVal.map(dt => dt.marks))
            var final_res = elementVal.filter(dt => dt.marks == maxValue)
            resolve(final_res);
          }
        } catch (err) {
          console.log(err);
          resolve([]);
        }
      })
    } catch (err) {
      console.log(err);
      resolve([]);
    }
  });
};

const calculateElementMarks = (frmElement, toElement) => {
  return new Promise(async (resolve, reject) => {
    var select = `marks`,
      table_name = `md_element_match`,
      whr = `from_ele = '${frmElement}' AND to_ele = '${toElement}'`,
      order = null;
    var partner_match_dt = await db_Select(select, table_name, whr, order);
    if (partner_match_dt.suc > 0 && partner_match_dt.msg.length == 0) {
      var select = `marks`,
        table_name = `md_element_match`,
        whr = `from_ele = '${toElement}' AND to_ele = '${frmElement}'`,
        order = null;
      var partner_match_dt = await db_Select(select, table_name, whr, order);
      resolve(partner_match_dt);
    } else {
      resolve(partner_match_dt);
    }
  });
}

const MongalMatch = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      var data = require(`../raw_data/${filePath}`),
        asc_mangal = false,
        moon_mangal = false;
      if (data.status == "ok") {
        var planet_data = data.data.planet_position;
        var asc_pos = planet_data.findIndex((dt) => dt.name == "Ascendant"),
          elementVal = [];

        for (let dt of planet_data) {
          dt.position =
            dt.position >= planet_data[asc_pos].position
              ? Math.abs(
                parseInt(dt.position - planet_data[asc_pos].position)
              ) + 1
              : dt.position + planet_data[asc_pos].position - 1;
        }
        var asc_planet_data = planet_data;

        for (let dt of asc_planet_data) {
          if (MongalField[0].fields.includes(dt.position)) {
            if (dt.name == "Mars") {
              asc_mangal = 80;
            }
          }
        }

        var moon_pos = planet_data.findIndex((dt) => dt.name == "Moon"),
          elementVal = [];

        for (let dt of planet_data) {
          dt.position =
            dt.position >= planet_data[moon_pos].position
              ? Math.abs(
                parseInt(dt.position - planet_data[moon_pos].position)
              ) + 1
              : dt.position + planet_data[moon_pos].position - 1;
        }

        var moon_planet_data = planet_data;

        for (let dt of moon_planet_data) {
          if (MongalField[1].fields.includes(dt.position)) {
            if (dt.name == "Mars") {
              moon_mangal = 20;
            }
          }
        }

        var marks =
          (asc_mangal ? asc_mangal : 0) + (moon_mangal ? moon_mangal : 0);

        resolve(marks);
      } else {
        resolve(0);
      }
    } catch (err) {
      console.log(err);
      resolve([]);
    }
  });
};

const checkMoonMongalDosh = (filePath) => {
  return new Promise((resolve, reject) => {
    if (filePath) {
      fs.readFile(path.join('raw_data', filePath), 'utf8', (err, jsonData) => {
        try {
          var pData = JSON.parse(jsonData),
            mangal_marks = 0;
          if (pData.status == "ok") {
            var planet_data = pData.data.planet_position;

            var moon_pos = planet_data.filter((dt) => dt.name == "Moon")
            moon_pos = moon_pos.length > 0 ? moon_pos[0].position : 0

            for (let dt of planet_data) {
              dt.position = dt.position >= moon_pos ? ((dt.position - moon_pos) + 1) : (((12 + dt.position) - moon_pos) + 1)
            }

            for (let dt of planet_data) {
              if (MongalField[1].fields.includes(dt.position)) {
                if (dt.name == "Mars") {
                  mangal_marks = 20;
                  break;
                }
              }
            }
            resolve(mangal_marks);
          } else {
            resolve(0);
          }
        } catch (err) {
          console.log(err);
          resolve(0)
        }
      })
    } else {
      resolve(0);
    }
  })
}

const checkAscMongalDosh = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path.join('raw_data', filePath), 'utf8', (err, jsonData) => {
        try {
          var pData = JSON.parse(jsonData),
            mangal_marks = 0;
          if (pData.status == "ok") {
            var planet_data = pData.data.planet_position;

            var asc_pos = planet_data.filter((dt) => dt.name == "Ascendant")
            asc_pos = asc_pos.length > 0 ? asc_pos[0].position : 0

            for (let dt of planet_data) {
              dt.position = dt.position >= asc_pos ? ((dt.position - asc_pos) + 1) : ((12 + dt.position) - asc_pos) + 1
            }

            for (let dt of planet_data) {
              if (MongalField[0].fields.includes(dt.position)) {
                if (dt.name == "Mars") {
                  mangal_marks = 80;
                  break;
                }
              }
            }
            resolve(mangal_marks);
          } else {
            resolve(0);
          }
        } catch (err) {
          console.log(err);
          resolve(0);
        }
      })
    } catch (err) {
      console.log(err);
      resolve(0);
    }
  })
}

const CalculateMongalMarks = (frmMonMark, toMonMark) => {
  return new Promise((resolve, reject) => {
    var mongal_marks = 0;
    if ((frmMonMark == 80 && toMonMark == 20) || (frmMonMark == 20 && toMonMark == 80)) {
      mongal_marks = 5
    } else if ((frmMonMark == 100 && toMonMark == 20) || (frmMonMark == 20 && toMonMark == 100)) {
      mongal_marks = 5
    } else if ((frmMonMark == 80 && toMonMark == 0) || (frmMonMark == 0 && toMonMark == 80)) {
      mongal_marks = 0
    } else if ((frmMonMark == 100 && toMonMark == 0) || (frmMonMark == 0 && toMonMark == 100)) {
      mongal_marks = 0
    } else if ((frmMonMark == 80 && toMonMark == 80) || (frmMonMark == 80 && toMonMark == 80)) {
      mongal_marks = 20
    } else if ((frmMonMark == 100 && toMonMark == 80) || (frmMonMark == 80 && toMonMark == 100)) {
      mongal_marks = 20
    } else if ((frmMonMark == 20 && toMonMark == 20) || (frmMonMark == 20 && toMonMark == 20)) {
      mongal_marks = 20
    } else if ((frmMonMark == 0 && toMonMark == 0) || (frmMonMark == 0 && toMonMark == 0)) {
      mongal_marks = 20
    } else if ((frmMonMark == 20 && toMonMark == 0) || (frmMonMark == 0 && toMonMark == 20)) {
      mongal_marks = 20
    } else if ((frmMonMark == 80 && toMonMark == 0) || (frmMonMark == 0 && toMonMark == 80)) {
      mongal_marks = 0
    } else if ((frmMonMark == 100 && toMonMark == 0) || (frmMonMark == 100 && toMonMark == 0)) {
      mongal_marks = 0
    } else if ((frmMonMark == 100 && toMonMark == 100) || (frmMonMark == 100 && toMonMark == 100)) {
      mongal_marks = 20
    }
    resolve(mongal_marks)
  })
}

const MoonshineMatch = (own_rashi, partner_rashi) => {
  return new Promise(async (resolve, reject) => {
    try {
      var res_dt = await db_Select('id', 'md_moonshine_match', `frm_rashi_id = ${own_rashi} AND to_rashi_id = ${partner_rashi}`, null)
      var marks = res_dt.suc > 0 ? (res_dt.msg.length > 0 ? 0 : 10) : 0
      resolve(marks)
    } catch (err) {
      console.log(err);
      resolve(0);
    }
  });
}

const SunshineNumberMatch = (frm_rashi_id, to_rashi_id, m_number, pDob) => {
  return new Promise(async (resolve, reject) => {
    var marks = 0
    var select = `id,frm_rashi_id,b_day,b_month,to_rashi_id,m_number,match_flag`,
      table_name = `md_sunshine_match`,
      whr = `STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', b_month, '-', b_day), '%Y-%m-%d') 
      <= '${dateFormat(new Date(), "yyyy")}-${dateFormat(pDob, "mm-dd")}' 
      AND
      STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', b_month, '-', b_day), '%Y-%m-%d') >= '${dateFormat(new Date(), "yyyy")}-${dateFormat(pDob, "mm-dd")}' 
      AND frm_rashi_id = '${frm_rashi_id}' AND to_rashi_id = '${to_rashi_id}' AND m_number = '${m_number}'`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0 && res_dt.msg.length > 0) {
      marks = res_dt.suc > 0 ? (res_dt.msg.length > 0 ? (res_dt.msg[0].match_flag == 'VG' ? 20 : (res_dt.msg[0].match_flag == 'G' ? 15 : 5)) : 0) : 0
    } else {
      var select = `id,frm_rashi_id,b_day,b_month,to_rashi_id,m_number,match_flag`,
        table_name = `md_sunshine_match`,
        whr = `STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', b_month, '-', b_day), '%Y-%m-%d') 
        <= '${dateFormat(new Date(), "yyyy")}-${dateFormat(pDob, "mm-dd")}' 
        AND
        STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', b_month, '-', b_day), '%Y-%m-%d') >= '${dateFormat(new Date(), "yyyy")}-${dateFormat(pDob, "mm-dd")}' 
        AND frm_rashi_id = '${frm_rashi_id}' AND to_rashi_id = '${to_rashi_id}'`,
        order = null;
      var res_dt = await db_Select(select, table_name, whr, order);
      marks = res_dt.suc > 0 && res_dt.msg.length > 0 ? 5 : 0
    }
    resolve(marks);
  })
};

const MoonShineName = (position) => {
  return new Promise(async (resolve, reject) => {
    var select = `rashi`,
      table_name = `md_rashi_pos`,
      whr = `position = ${position}`,
      order = null;
    var MoonShine_dt = await db_Select(select, table_name, whr, order);
    resolve(MoonShine_dt)
  });
};

const favList = (own_id, partner_id) => {
  return new Promise(async (resolve, reject) => {
    var select = `IF(id > 0, flag, 'N') flag`,
      table_name = `td_favourite_list`,
      whr = `own_id = '${own_id}' AND partner_id = '${partner_id}'`,
      order = null;
    var fav_dt = await db_Select(select, table_name, whr, order);
    resolve(fav_dt)
  });
};

module.exports = {
  partner_match,
  RashiMatch,
  NumberMatchWithDate,
  JotokMatch,
  ElementMatch,
  MongalMatch,
  MoonshineMatch,
  calculateElementMarks,
  CalculateMongalMarks,
  SunshineNumberMatch,
  checkMoonMongalDosh,
  checkAscMongalDosh,
  MoonShineName,
  favList
};