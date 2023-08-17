const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);
//router.get("/k", pCtrl);
router.get("/tokyo", pCtrl.cView.tokyo);
router.get("/osaka", pCtrl.cView.osaka);
router.get("/sapporo", pCtrl.cView.sapporo);
//router.get("/ch", pCtrl);
//router.get("/ch", pCtrl);
//router.get("/fr", pCtrl);
//router.get("/en", pCtrl);
//router.get("/us", pCtrl);

module.exports = router