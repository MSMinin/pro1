const router = require("express").Router();
const pCtrl = require("../../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);

router.get("/newyork", pCtrl.uView.newyork);
router.get("/losangeles", pCtrl.uView.losangeles);
router.get("/lasvegas", pCtrl.uView.lasvegas);

router.get("/image/:fileName", pCtrl.uView.image);

module.exports = router