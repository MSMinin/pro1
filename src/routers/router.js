module.exports = (app) => {
    const pRouter = require("./project/project_router");

    app.use("/", pRouter);

    const router = require("express").Router();
    
    router.get("/", (req, res) => {
        res.render("main");
    });

    return router;
}