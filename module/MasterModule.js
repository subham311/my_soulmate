const db = require("../core/db"),
fs = require('fs'),
path = require('path'),
request = require("request"),
dateFormat = require("dateformat");
 CryptoJS = require('crypto-js')
const secretKey = 'S#O!*U8L0M3A9T7e!2&0#2$3S9Y4N3E$R7g8i2C';


const db_Select = (select, table_name, whr, order) => {
    var tb_whr = whr ? `WHERE ${whr}` : "";
    var tb_order = order ? order : "";
    let sql = `SELECT ${select} FROM ${table_name} ${tb_whr} ${tb_order}`;
    // console.log(sql);
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                data = { suc: 0, msg: JSON.stringify(err) };
            } else {
                data = { suc: 1, msg: result, sql };
            }
            resolve(data);
        });
    });
};

const db_Insert = (table_name, fields, values, whr, flag) => {
    var sql = "",
        msg = "",
        tb_whr = whr ? `WHERE ${whr}` : "";
    // 0 -> INSERT; 1 -> UPDATE
    // IN INSERT flieds ARE TABLE COLOUMN NAME ONLY || IN UPDATE fields ARE TABLE NAME = VALUES
    if (flag > 0) {
        sql = `UPDATE ${table_name} SET ${fields} ${tb_whr}`;
        msg = "Updated Successfully !!";
    } else {
        sql = `INSERT INTO ${table_name} ${fields} VALUES ${values}`;
        msg = "Inserted Successfully !!";
    }
    // console.log(sql);
    return new Promise((resolve, reject) => {
        db.query(sql, (err, lastId) => {
            if (err) {
                console.log(err);
                data = { suc: 0, msg: JSON.stringify(err) };
            } else {
                data = { suc: 1, msg: msg, lastId };
            }
            resolve(data);
        });
    });
};

const db_Delete = (table_name, whr) => {
    whr = whr ? `WHERE ${whr}` : "";
    var sql = `DELETE FROM ${table_name} ${whr}`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, lastId) => {
            if (err) {
                console.log(err);
                data = { suc: 0, msg: JSON.stringify(err) };
            } else {
                data = { suc: 1, msg: "Deleted Successfully !!" };
            }
            resolve(data);
        });
    });
};

const db_Check = async (fields, table_name, whr) => {
    var sql = `SELECT ${fields} FROM ${table_name} WHERE ${whr}`;
    // console.log(sql);
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                data = { suc: 0, msg: JSON.stringify(err) };
            } else {
                data = { suc: 1, msg: result.length };
            }
            resolve(data);
        });
    });
};

const EncryptDataToSend = (data) => {
    return new Promise((resolve, reject) => {
        var res_dt = data;
        res_dt = {suc:res_dt.suc, msg: res_dt.suc > 0 ? Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64') : res_dt.msg }
        resolve(res_dt)
    })
}

const Encrypt = (data) => {
    return new Promise((resolve, reject) =>{
        const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
        console.log(data, ciphertext);
       resolve(ciphertext)
    })
}

var tot_match = 5
const globalValues = {
    jotok_max: 38,
    tot_match: tot_match,
    each_marks: 100/tot_match,
    full_marks: 100/tot_match,
    worst_marks: 0
}

const SunshineMatch = {
    'G': globalValues.full_marks,
    'M': globalValues.full_marks/2,
    'VA': globalValues.worst_marks
}

const NumberMatch = {
    'G': globalValues.full_marks,
    'M': globalValues.full_marks/2,
    'VA': globalValues.worst_marks,
    'MA': (globalValues.full_marks/2)/2
}

const ElementoryField = [
    {flag: 'A', start: 1, end: 4, fields: [1,2,3,4]},
    {flag: 'W', start: 10, end: 1, fields: [10,11,12,1]},
    {flag: 'F', start: 7, end: 10, fields: [7,8,9,10]},
    {flag: 'E', start: 4, end: 7, fields: [4,5,6,7]},
]

const MongalField = [
    {flag: 'A', fields: [1,4,7,8,12]},
    {flag: 'M', fields: [1,4,7,8,12]},
]

const MoonShineNotMatchField = [2,6,8,14];


const GenPassword = () => {
    return new Promise((resolve, reject) => {
var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var a = alpha[Math.floor(Math.random() * 62)];
  var b = alpha[Math.floor(Math.random() * 62)];
  var c = alpha[Math.floor(Math.random() * 62)];
  var d = alpha[Math.floor(Math.random() * 62)];
  var e = alpha[Math.floor(Math.random() * 62)];
  var sum_id = a + b + c + d + e;
  var sum = sum_id.toUpperCase();
  console.log(sum);
  resolve(sum)
    })
  
}

const getAccessTokenMaster = () => {
    return new Promise((resolve, reject) => {
        var access_token = fs.readFileSync(path.join(__dirname, '../accessToken.json'), 'utf-8')
		var tokenFile = JSON.parse(access_token)
		if (dateFormat(tokenFile.created_dt, "yyyy-mm-dd") == dateFormat(new Date(), "yyyy-mm-dd")){
			const timeDiff = parseInt(
				(new Date().getTime() -
				  new Date(Date.parse(tokenFile.created_dt)).getTime()) /
				  (60 * 60 * 1000)
			  );
			if (timeDiff >= 1) {
				var options = {
					method: "POST",
					url: process.env.GENERATE_TOKEN_API,
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						grant_type: process.env.GRANT_TYPE,
						client_id: process.env.CLIENT_ID,
						client_secret: process.env.CLIENT_SECRET,
					}),
				};
				request(options, function (error, response) {
					if (error) throw new Error(error);
					var output = JSON.parse(response.body);
					resolve(output.access_token)
				});
			}else{
				resolve(tokenFile.token)
			}
		}else{
			var options = {
				method: "POST",
				url: process.env.GENERATE_TOKEN_API,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					grant_type: process.env.GRANT_TYPE,
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
				}),
			};
			request(options, function (error, response) {
				if (error) throw new Error(error);
				var output = JSON.parse(response.body);
				resolve(output.access_token)
			});
		}
    })
};

const checkFieldsValue = (value, type) => {
    return new Promise((resolve, reject) => {
        var msg = '';
        switch (type) {
            case 'string':
                if(value)
                    if(typeof(value) === 'string')
                        if(value != '' || value != 'null' || value != 'undefined')
                            msg = 'valid'
                        else
                            msg = 'null'
                    else
                        msg = 'not string'
                else
                msg = 'undefined'
                break;
            case 'number':
                if(value)
                    if(typeof(value) === 'number')
                        if(value > 0)
                            msg = 'valid'
                        else
                            msg = 'value should greater than 0'
                    else
                        msg = 'not a number'
                else
                msg = 'undefined'
                break;
            case 'phone':
                if(value)
                    if(typeof(value) === 'number')
                        if(value.toString().length == 10)
                            msg = 'valid'
                        else
                            msg = 'value not acceptable'
                    else
                        msg = 'not a number'
                else
                msg = 'undefined'
                break;
            case 'date':
                if(value)
                    if(Object.prototype.toString.call(new Date(value)) === "[object Date]")
                        msg = 'valid'
                    else
                        msg = 'not a correct date'
                else
                msg = 'undefined'
                break;
            default:
                break;
        }
        resolve(msg)
    })
}



const getOrderMaxId = (fin_year) => {
 return new Promise(async (resolve, reject) => {
    var select = 'ifnull(max(id),0) + 1 max_id', table_name = 'td_payment_request', whr = `financial_yr = ${fin_year}`, order = null;
var res_dt = await db_Select(select, table_name, whr, order);
resolve(res_dt)
 })
};

const updateData = {
    '1': 'All Immages',
    '2': 'In my own words' ,
    '3': 'Birth Details',
    '4': 'Basic Details',
    '5': 'Contact Details',
    '6': 'Religion Information',
    '7': 'Grooms Location',
    '8': 'Professional Information',
    '9': 'Family Details',
    '10': 'Hobbies',
    '11': 'About Family',
};

const updateStatus = (prof_id, edite_flag, chk_flag, user, dt, id = 0) => {
    return new Promise(async (resolve, reject) => {
        var table_name = 'td_check_update',
        fileds = id > 0 ? `check_flag = '${chk_flag}'` : `(profile_id,edite_flag,check_flag,modified_by,modified_dt)`, 
        values = `('${prof_id}', '${updateData[edite_flag]}', '${chk_flag}' , '${user}', '${dt}')`,
        whr = id > 0 ? `id=${id}` : null,
        flag = id > 0 ? 1 : 0;
        var res_dt = await db_Insert(table_name, fileds, values, whr, flag)
        resolve(res_dt)
    })
};

const updateViewFlag = (id) => {
    return new Promise(async (resolve, reject) => {
        var table_name = 'td_user_profile',
        fields = `view_flag = 'N'`,
        values = null,
        whr = `id = ${id}`,
        flag = 1;
        var res_dt = await db_Insert(table_name,fields,values,whr,flag)
        resolve(res_dt)
    })
}

const WriteLogFile = (text) => {
    try{
        fs.appendFileSync(path.join('assets', "log/log.txt"), text);
    }catch(err){
        console.log(err);
    }
}

module.exports = { db_Select, db_Insert, db_Delete, db_Check, EncryptDataToSend,GenPassword, globalValues, SunshineMatch, NumberMatch, ElementoryField, MongalField, MoonShineNotMatchField, getAccessTokenMaster, checkFieldsValue, getOrderMaxId , updateStatus, updateViewFlag, Encrypt, WriteLogFile}