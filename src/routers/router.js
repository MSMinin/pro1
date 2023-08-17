module.exports = (app) => {
    const MRouter = require("./member/member_router");
    const wRouter = require("./worldcup/worldcup_router");
    const cRouter = require("./country/country_router")

<<<<<<< HEAD
    app.use("/", pRouter);

    const router = require("express").Router();
    
    router.get("/", (req, res) => {
        res.render("main");
    });
=======
    app.use("/member", MRouter);
    app.use("/worldcup", wRouter);
    app.use("/country", cRouter);

    const router = require("express").Router();

    app.get("/", (req, res) => {
        res.render("index", {username : req.session.username});
    })
>>>>>>> moonsm

    return router;
}