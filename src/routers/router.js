module.exports = (app) => {
    const MRouter = require("./member/member_router");
    const wRouter = require("./worldcup/worldcup_router");
    const cRouter = require("./country/country_router");
    const pRouter = require("./project/project_router");

    app.use("/member", MRouter);
    app.use("/worldcup", wRouter);
    app.use("/country", cRouter);
    app.use("/board", pRouter);

    const router = require("express").Router();

    app.get("/", (req, res) => {
        res.render("index", {username : req.session.username});
    })
    return router;
}