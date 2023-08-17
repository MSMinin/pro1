module.exports = (app) => {
    const pRouter = require("./project/project_router");
    const wRouter = require("./worldcup/worldcup_router");

    app.use("/", pRouter);
    app.use("/worldcup", wRouter);

    const router = require("express").Router();
    
    router.get("/", (req, res) => {
        res.render("main");
    });

    return router;
}
