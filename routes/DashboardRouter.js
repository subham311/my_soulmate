const express = require("express"),
DashboardRouter = express.Router();

DashboardRouter.use((req, res, next) => {
    var user = req.session.user
    if(!user){
        res.redirect("/login")
    }
    next()
})

DashboardRouter.get("/", function(req, res)  {
    res.render("dashboard/index");
})

module.exports = {DashboardRouter};