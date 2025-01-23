const { db_Select } = require('../module/MasterModule');

const express = require('express'),
    MasterRouter = express.Router(),
    dateFormat = require('dateformat'),
    request = require('request');

MasterRouter.get('/location_list', async (req, res) => {
    const location = require('../location.json')
    var res_dt = {suc: 1, msg: Buffer.from(JSON.stringify(location), 'utf8').toString('base64')}
    res.send(res_dt)
})

MasterRouter.get('/caste_list', async (req, res) => {
    var data = req.query
    var select = 'id, caste_name name', 
    table_name = 'md_caste_list',
    whr = data.id > 0 ? `id = ${id}` : null,
    order = 'ORDER BY caste_name';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc:res_dt.suc, msg: res_dt.suc > 0 ? Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64') : res_dt.msg })
})

MasterRouter.get('/gothram_list', async (req, res) => {
    var data = req.query
    var select = 'id, gothro_name name', 
    table_name = 'md_gothram',
    whr = data.id > 0 ? `id = ${id}` : null,
    order = 'ORDER BY gothro_name';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc:res_dt.suc, msg: res_dt.suc > 0 ? Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64') : res_dt.msg })
})

MasterRouter.get('/occupation_list', async (req, res) => {
    var data = req.query
    var new_arr = {}, res_data;
    var select = 'id, catg_name', 
        table_name = 'md_occu_catg',
        whr = data.id > 0 ? `id = ${id}` : null,
        order = 'ORDER BY catg_name';
    var res_dt = await db_Select(select, table_name, whr, order)
    if(res_dt.suc > 0 && res_dt.msg.length > 0){
        for(let dt of res_dt.msg){
            var select = 'id, occu_name name, occu_id', 
                table_name = 'md_occupation',
                whr = `occu_id = ${dt.id}`,
                order = 'ORDER BY occu_name';
            var occu_dt = await db_Select(select, table_name, whr, order)
            new_arr[dt.catg_name] = occu_dt.suc > 0 ? occu_dt.msg : null
        }
        res_data = {suc: 1, msg: Buffer.from(JSON.stringify(new_arr), 'utf8').toString('base64')}
    }else{
        res_data = {suc: res_dt.suc, msg: Buffer.from(JSON.stringify(res_dt), 'utf8').toString('base64')}
    }
    res.send(res_data)
})

MasterRouter.get('/income_list', async (req, res) => {
    var data = req.query
    var select = 'id, income', 
        table_name = 'md_income',
        whr = data.id > 0 ? `id = ${id}` : null,
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
})

MasterRouter.get('/education', async (req,res) => {
    var data = req.query
    var new_arr = {}, res_data;
    var select = 'id, edu_catg',
     table_name = 'md_edu_catg',
    whr = data.id > 0 ? `id = ${id}` : null;
    order = 'ORDER BY edu_catg';
    var res_dt = await db_Select(select, table_name, whr, order)
    if(res_dt.suc > 0 && res_dt.msg.length > 0){
        for(let dt of res_dt.msg){
            var select = 'id, edu_name name, edu_id', 
                table_name = 'md_education',
                whr = `edu_id = ${dt.id}`,
                order = 'ORDER BY edu_name';
            var edu_dt = await db_Select(select, table_name, whr, order)
            new_arr[dt.edu_catg] = edu_dt.suc > 0 ? edu_dt.msg : null
        }
        res_data = {suc: 1, msg: Buffer.from(JSON.stringify(new_arr), 'utf8').toString('base64')}
    }else{
        res_data = {suc: res_dt.suc, msg: Buffer.from(JSON.stringify(res_dt), 'utf8').toString('base64')}
    }
    res.send(res_data)
})

MasterRouter.get('/lang_list', async (req, res) => {
    var data = req.query
    var select = 'id, lang_name', 
        table_name = 'md_language',
        whr = data.id > 0 ? `id = ${id}` : (data.lang_name ? `lang_name LIKE "%${data.lang_name}%"` : null),
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
})

const getNakhatra = (degree = null, pos = null) => {
 return new Promise(async (resolve, reject) => {
    var select = 'a.id, a.from_deg, a.to_deg, a.nakhatra_id, b.nakhatra',
    table_name = 'md_pos_nakhatra a, md_nakhatra b'
    whr = `a.nakhatra_id = b. nakhatra_id AND a.from_deg<=${degree} AND a.to_deg>=${degree} AND a.pos=${pos};`,
    order = null;
    var res_dt = db_Select(select, table_name, whr, order)
    resolve(res_dt)
 })
}

const getJotukRashiId = (rasi_name = null, nakhatra_name = null) => {
  return new Promise(async (resolve, reject) => {
    console.log(rasi_name, nakhatra_name);
    var select = "id",
      table_name = "md_jotok_rashi",
      whr = `rashi_name_eng LIKE "${rasi_name} ${nakhatra_name}%"`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    console.log(res_dt);
    resolve(res_dt);
  });
};

MasterRouter.get('/countries_list', async (req, res) => {
    var data = req.query
    var select = 'id, shortname, name, phonecode', 
        table_name = 'md_countries',
        whr = data.id > 0 ? `id = ${id}` : null,
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});


MasterRouter.get('/states_list', async (req, res) => {
    var data = req.query.country_id;
    var select = 'id, name, country_id', 
        table_name = 'md_states',
        whr = data > 0 ? `country_id = ${data}` : null,
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});

MasterRouter.get('/cities_list', async (req, res) => {
    var data = req.query.state_id
    var select = 'id, name, state_id, lattitude, longtitude', 
        table_name = 'md_cities',
        whr = data > 0 ? `state_id = ${data}` : '',
        order = 'ORDER BY name, state_id';
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});


MasterRouter.get('/hobbies_list', async (req, res) => {
    var data = req.query;
    var select = 'id, hobby',
    table_name = 'md_hobby',
    whr = data.id > 0 ? `id = ${id}` : (data.hobby ? `hobby LIKE "%${data.hobby}%"` : null),
    order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf-8').toString('base64')})
});

MasterRouter.get('/sports_list', async (req, res) => {
    var data = req.query
    console.log(data);
    var select = 'id, sports', 
        table_name = 'md_sports',
        whr = data.id > 0 ? `id = ${id}` : null,
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    // res.send(res_dt)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});

MasterRouter.get('/music_list', async (req, res) => {
    var data = req.query
    var select = 'id, music', 
        table_name = 'md_music',
        whr = data.id > 0 ? `id = ${id}` : (data.music ? `music LIKE "%${data.music}%"` : null),
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});


MasterRouter.get('/movie_list', async (req, res) => {
    var data = req.query
    var select = 'id, movie', 
        table_name = 'md_movie',
        whr = data.id > 0 ? `id = ${id}` : (data.movie ? `movie LIKE "%${data.movie}%"` : null),
        order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send({suc: 1, msg: Buffer.from(JSON.stringify(res_dt.msg), 'utf8').toString('base64')})
});

module.exports = { MasterRouter,getNakhatra, getJotukRashiId };