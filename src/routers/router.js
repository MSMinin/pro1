module.exports = (app) => {
    const MRouter = require("./member/member_router");
    const wRouter = require("./worldcup/worldcup_router");

    app.use("/member", MRouter);
    app.use("/worldcup", wRouter);

    const router = require("express").Router();

    app.get("/", (req, res) => {
        res.render("index", {username : req.session.username});
    })

    return router;
}