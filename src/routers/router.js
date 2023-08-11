module.exports = (app) => {
    const pRouter = require("./project/project_router");
    const wRouter = require("./worldcup/worldcup_router");

    app.use("/project", pRouter);
    app.use("/worldcup", wRouter);

    const router = require("express").Router();
    /*router.get("/", (req, res) => {
        res.send("test");
    })*/

    return router;
}