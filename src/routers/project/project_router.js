const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

const  multer = require("multer");

// router.get("/", (req, res) => {
//     res.render("main");
// });


router.get("/boardList", pCtrl.views.boardList);

router.get("/content/:num", pCtrl.views.content);

// router.get("/write_form/:id", pCtrl.views.writeForm);
router.get("/write_form", pCtrl.views.writeForm);
router.post("/write", pCtrl.process.write);

router.get("/modify_form/:num", pCtrl.views.modifyForm);
router.post("/modify", pCtrl.process.modify);

router.get("/delete/:num", pCtrl.process.delete);

router.post("/likes", pCtrl.process.likes);

router.post("/login", pCtrl.process.loginChk)

module.exports = router;