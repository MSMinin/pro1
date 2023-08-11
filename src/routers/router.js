module.exports = (app) => {
    const pRouter = require("./project/project_router");

    app.use("/project", pRouter);
    app.use("/memberinfo", pRouter);
    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.send("test");
    })

    return router;
}