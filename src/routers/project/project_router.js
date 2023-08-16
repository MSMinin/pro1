const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

router.get("/", (req, res) => {
    res.render("login", {username : req.session.username});
});

<<<<<<< HEAD
router.post("/project/login", pCtrl.process.loginChk)
router.get("/project/logout", pCtrl.process.logout);

router.get("/project/registerForm", pCtrl.view.registerForm)
router.post("/project/register", pCtrl.process.register)

router.get("/project/list_view", pCtrl.process.list);


=======
router.post("/login", pCtrl.process.loginChk);
>>>>>>> yujin

module.exports = router;