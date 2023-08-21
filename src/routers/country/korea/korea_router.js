const router = require("express").Router();
const pCtrl = require("../../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);

router.get("/seoul", pCtrl.kView.seoul);
router.get("/daegu", pCtrl.kView.daegu);
router.get("/busan", pCtrl.kView.busan);
router.get("/gyeongju", pCtrl.kView.gyeongju);
router.get("/gangneung", pCtrl.kView.gangneung);
router.get("/jeonju", pCtrl.kView.jeonju);
router.get("/image/:fileName", pCtrl.kView.image);

module.exports = router