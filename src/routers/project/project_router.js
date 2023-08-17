const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

const  multer = require("multer");

// router.get("/", (req, res) => {
//     res.render("main");
// });


router.get("/boardList", pCtrl.view.boardList);

router.get("/content/:num", pCtrl.view.content);

// router.get("/write_form/:id", pCtrl.view.writeForm);
router.get("/write_form", pCtrl.view.writeForm);
router.post("/write", pCtrl.process.write);

router.get("/modify_form/:num", pCtrl.view.modifyForm);
router.post("/modify", pCtrl.process.modify);

router.get("/delete/:num", pCtrl.process.delete);

router.post("/likes", pCtrl.process.likes);

router.post("/login", pCtrl.process.loginChk)

module.exports = router;