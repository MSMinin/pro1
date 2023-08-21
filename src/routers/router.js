module.exports = (app) => {
    const MRouter = require("./member/member_router");
    const wRouter = require("./worldcup/worldcup_router");
    const cRouter = require("./country/country_router");
    const bRouter = require("./board/board_router");
    const pCtrl = require("../cotroller/project_ctrl");

    const fs = require("fs");
    const fileList3 = fs.readdirSync("./src/views/data1/images");

    app.use("/", bRouter);
    app.use("/member", MRouter);
    app.use("/worldcup", wRouter);
    app.use("/country", cRouter);

    const router = require("express").Router();

    app.get("/", (req, res) => {
        res.render("index", {username : req.session.username, files : fileList3});
    });

    app.get("/banner/images/:fileName",pCtrl.process.banner);
    return router;
}
