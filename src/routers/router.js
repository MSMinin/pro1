module.exports = (app) => {
    const MRouter = require("./member/member_router");
    const wRouter = require("./worldcup/worldcup_router");
    const cRouter = require("./country/country_router");
    const bRouter = require("./board/board_router");

    app.use("/", bRouter);
    app.use("/member", MRouter);
    app.use("/worldcup", wRouter);
    app.use("/country", cRouter);

    const router = require("express").Router();
    const pCtrl = require("../../src/cotroller/project_ctrl");
    app.get("/", pCtrl.banner.index);
    app.get("/:fileName", pCtrl.banner.image);

    return router;
}
