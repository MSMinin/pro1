const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

router.get("/1",pCtrl.views.worldcup1);
router.get("/1/:id",pCtrl.process.worldcup1);
router.get("/2",pCtrl.views.worldcup2);
router.get("/2/:id",pCtrl.process.worldcup2);
router.get("/3",pCtrl.views.worldcup2);
router.get("/3/:id",pCtrl.process.worldcup3);
router.get("/4",pCtrl.views.worldcup2);
router.get("/4/:id",pCtrl.process.worldcup4);
router.get("/worldcupCheck",pCtrl.process.worldcupCheck);
module.exports = router;