// const { AdminRouter } = require("./routes/adminRouter");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { userRouter } = require("./routes/UserRouter");
const { DashboardRouter } = require("./routes/DashboardRouter");
const { paymentRouter } = require("./routes/PaymentRouter");
const { add_typeRouter } = require("./routes/add_typeRouter");
const { add_dtlsRouter } = require("./routes/Add_dtlsRouter");
const { add_amountRouter } = require("./routes/Add_amountRouter");
const { EmailRouter } = require("./routes/EmailRouter");
const { invoiceRouter } = require("./routes/InvoiceRouter");
const { AdminRouter } = require("./routes/AdminRouter");
const { discount_textRouter } = require("./routes/Discount_textRouter");

app = express();
expressLayouts = require("express-ejs-layouts"),
  path = require("path"),
  port = process.env.PORT || 3001;

// Set up the session middleware
app.use(
  session({
    secret: "My Soul Mate", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie : {
      maxAge: 3600000
    }
  })
);

app.use(bodyParser.json());

app.use(expressLayouts);
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// SET VIEW ENGINE AND PATH //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout", "templates/layout");
// app.set("layout extractScripts", true);
// app.set("layout extractStyles", true);
// app.set("layout extractMetas", true);

// SET ASSETS AS A STATIC PATH //
app.use(express.static(path.join(__dirname, "assets/dist")));

app.use((req, res, next) => {
  res.locals.user = req.session.user
  // console.log(req.path);
  res.locals.path = req.path;
  // console.log(req.path);
  next();
});

app.get("/", (req, res) => {
var user = req.session.user
if(user){
  res.redirect("/dashboard")
}else{
  res.redirect("/login")
}
})

app.get("/login", (req, res) => {
  res.render("dashboard/login");
});



//  app.get('/user_list', (req, res) => {
//     res.render('dashboard/user_datatable')
//  })

app.use("/admin", AdminRouter);
app.use("/user", userRouter);
app.use("/dashboard", DashboardRouter);
app.use("/payment", paymentRouter);
app.use("/payment", add_typeRouter);
app.use("/payment", add_dtlsRouter);
app.use("/payment", add_amountRouter);
app.use("/email", EmailRouter);
app.use("/invoice", invoiceRouter);
app.use("/discount", discount_textRouter);

app.listen(port, (err) => {
  if (err) throw new Error(err);
  else console.log(`App is running at http://localhost:${port}`);
});
