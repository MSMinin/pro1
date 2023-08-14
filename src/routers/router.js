module.exports = (app) => {
    const pRouter = require("./project/project_router");

    app.use("/project", pRouter);

    const router = require("express").Router();
    router.get("/", (req, res) => {
        if(req.session.username) {
            res.cookie("isLogin", true);
        }
        console.log(req.session.username)
        res.render("main", {username : req.session.username, list : req.session.username});
    })

    return router;
}