const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);
router.get("/gangneung", pCtrl.cView.gangneung);
router.get("/tokyo", pCtrl.cView.tokyo);
router.get("/osaka", pCtrl.cView.osaka);
router.get("/sapporo", pCtrl.cView.sapporo);
router.get("/seoul", pCtrl.cView.seoul);
router.get("/daegu", pCtrl.cView.daegu);
router.get("/busan", pCtrl.cView.busan);
router.get("/gyeongju", pCtrl.cView.gyeongju);
router.get("/jeonju", pCtrl.cView.jeonju);
router.get("/image/:fileName", pCtrl.cView.image);

module.exports = router