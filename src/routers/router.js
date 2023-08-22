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

<<<<<<< HEAD
<<<<<<< HEAD

=======
    app.get("/", (req, res) => {
        res.render("index", {username : req.session.username});
    });
    
>>>>>>> moonsm
=======
>>>>>>> 795717767b7f685a03f2214157a346469de3e22c
    return router;
}
