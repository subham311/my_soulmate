const express = require("express"),
 fileUpload = require("express-fileupload"),
  app = express(),
  cors = require("cors"),
  fs = require("fs"),
  dateFormat = require("dateformat"),
  dotenv = require("dotenv"),
  request = require("request"),
  path = require('path'),
  port = process.env.PORT || 3000;


const {filePayloadExists} = require('./middleware/filesPayloadExists');
const {fileSizeLimiter} = require('./middleware/fileSizeLimiter');
const {fileExtLimiter} = require('./middleware/fileExtLimiter');


const { db_Insert, db_Select, WriteLogFile } = require("./module/MasterModule");
const { MasterRouter } = require("./routes/MasterRouter");
const { ProfileRouter } = require("./routes/ProfileRouter");
const { rashiRouter } = require("./routes/RasiRouter");
const { UserRouter } = require("./routes/UserRouter");
const { PartnerRouter } = require("./routes/PartnerRouter");
const { KycRouter } = require('./routes/KycRouter');



dotenv.config();
// USING CORS //
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// app.use(express.static("uploads"));
app.use(express.static('assets'));

setInterval(() => {
  // console.log('Hi');
  try {
    fs.readFile("./accessToken.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        const tokenFile = JSON.parse(jsonString);
        if (
          dateFormat(tokenFile.created_dt, "yyyy-mm-dd") ==
          dateFormat(new Date(), "yyyy-mm-dd")
        ) {
          const timeDiff = parseInt(
            (new Date().getTime() -
              new Date(Date.parse(tokenFile.created_dt)).getTime()) /
              (60 * 60 * 1000)
          );
          if (timeDiff >= 1) {
            // console.log("time excided");
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
              if (output.access_token) {
                tokenFile.created_dt = dateFormat(
                  new Date(),
                  "yyyy-mm-dd HH:MM:ss"
                );
                tokenFile.token = output.access_token;
                fs.writeFile(
                  "./accessToken.json",
                  JSON.stringify(tokenFile),
                  "utf8",
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            });
          }
        } else {
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
            if (output.access_token) {
              tokenFile.created_dt = dateFormat(
                new Date(),
                "yyyy-mm-dd HH:MM:ss"
              );
              tokenFile.token = output.access_token;
              fs.writeFile(
                "./accessToken.json",
                JSON.stringify(tokenFile),
                "utf8",
                (err) => {
                  if (err) throw err;
                }
              );
            }
          });
        }
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
}, 1000 * 30);

setInterval(async () => {
  var now_time = dateFormat(new Date(), 'HH:MM')
  try{
    if(now_time == '23:59'){
      var res_dt = await db_Select('id, u_name, pay_flag, plan_id, plan_act_dt, plan_exp_dt', 'td_user_profile', `plan_id > 0 AND plan_act_dt is NOT null AND plan_exp_dt is not null AND plan_exp_dt = DATE(now())`, 'ORDER BY plan_exp_dt')
      if(res_dt.suc > 0){
        if(res_dt.msg.length > 0){
          var now_date = dateFormat(new Date(), 'yyyy-mm-dd')
          for(let dt of res_dt.msg){
            if(now_date <= dateFormat(dt.plan_exp_dt, 'yyyy-mm-dd')){
              await db_Insert('td_user_profile', `pay_flag = 'N', plan_id = 0, plan_act_dt = null, plan_exp_dt = null`, null, `id = ${dt.id}`, 1)
            }
          }
        }
      }
    }
  }catch(err){
    var txt = `[${dateFormat(new Date(), "dd-mmm-yy HH:MM:ss")}] : <<[TIME]>> ${now_time} \n`;
    txt = txt + `[${dateFormat(new Date(), "dd-mmm-yy HH:MM:ss")}] : <<[MESSAGE]>> TRYING TO EXICUTE EXPIRY FUNCTION \n`
    txt = txt + `[${dateFormat(new Date(), "dd-mmm-yy HH:MM:ss")}] : <<[ERROR]>> ${err} \n`
    txt = txt + `----------------------------------------------------------------------- \n`
    WriteLogFile(txt)
  }
}, 9000)

app.use((req, res, next) => {
  var api_key = req.headers.api_key,
    api_secret = req.headers.api_secret;
  if (req.path != "/" && req.path != "/payRes" && req.path != '/PayReq') {
    if (req.path.split("/")[1] == "uploads") {
      if (req.headers.referer && req.headers.referer == "http://localhost:4200/") {
        next();
      } 
      else {
        res.json({
          status: 0,
          message: "You Have no permission to access the file",
        });
      }
    } else {
      if (
        (api_key == "" ||
          api_key == null ||
          api_key == undefined ||
          !api_key) &&
        (api_secret == "" ||
          api_secret == null ||
          api_secret == undefined ||
          !api_secret)
      ) {
        res.json({
          status: 0,
          message: "Please provide correct credentials to access the API",
        });
        // }
      } else {
        var dec_key = Buffer.from(api_key, "base64"),
          dec_secret = Buffer.from(api_secret, "base64");
        if (
          dec_key == process.env.API_KET &&
          dec_secret == process.env.API_SECRET
        ) {
          next();
        } else {
          res.json({
            status: 0,
            message: "Please provide correct credentials to access the API",
          });
        }
      }
    }
  } else {
    next();
  }
});

app.get("/", async (req, res) => {
  res.send('Welcome to MySoulmate API');
});

const sendMail = require("./controllers/sendMail");
const { SendUserEmail } = require("./module/EmailModule");
const { subscriptionRouter } = require("./routes/SubscriptionRouter");
const { ServercheckRouter } = require("./routes/ServercheckRouter");
const { PaymentRouter } = require("./routes/PaymentRouter");

app.get("/email", sendMail);

app.use("/user", UserRouter);
app.use("/master", MasterRouter);
app.use('/profile', ProfileRouter)
app.use(rashiRouter);
app.use('/partner', PartnerRouter);
app.use('/kyc', KycRouter);
app.use('/subscription', subscriptionRouter);
app.use('/server', ServercheckRouter);
app.use(PaymentRouter)

app.post('/upload', 
fileUpload({ crereateParentPath: true }),
filePayloadExists,
fileExtLimiter(['.png','.jpg','.jpeg']),
fileSizeLimiter,
 ( req, res) => {
      const files = req.files
      console.log(req.body);

    Object.keys(files).forEach(key => {
     const filepath = path.join(__dirname, 'files', files[key].name)
     files[key].mv(filepath, (err) => {
      if (err) res.status(500).json({ status: 'error', 
      message: err})
     })
    })

      res.json({ status: 'success', message: Object.keys(files).toString()})
 }
)

app.get('/uploads/:image', (req, res) => {
  var img = req.params.image
  console.log(req.path, req.headers.referer, img);
})


app.listen(port, (err) => {
  if (err) throw new Error(err);
  else console.log(`App is runnig at http://localhost:${port}`);
});