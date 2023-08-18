const router = require("express").Router();
const pCtrl = require("../../cotroller/board/board_ctrl");

// const  multer = require("multer");

router.get("/boardList", pCtrl.views.boardList);

router.get("/content/:num", pCtrl.views.content);

// router.get("/write_form/:id", pCtrl.views.writeForm);
router.get("/write_form", pCtrl.views.writeForm);
router.post("/write", pCtrl.process.write);

router.get("/modify_form/:num", pCtrl.views.modifyForm);
router.post("/modify", pCtrl.process.modify);

router.get("/delete/:num", pCtrl.process.delete);

router.post("/likes", pCtrl.process.likes);

module.exports = router;