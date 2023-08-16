module.exports = (app) => {
    const pRouter = require("./project/project_router");
    const wRouter = require("./worldcup/worldcup_router");

    app.use("/project", pRouter);
    app.use("/worldcup", wRouter);

    const router = require("express").Router();
<<<<<<< HEAD
    router.get("/", (req, res) => {
        if(req.session.username) {
            res.cookie("isLogin", true);
        }
        console.log(req.session.username)
        res.render("main", {username : req.session.username, list : req.session.username});
    })
=======
    /*router.get("/", (req, res) => {
        res.send("test");
    })*/
>>>>>>> yujin

    return router;
}