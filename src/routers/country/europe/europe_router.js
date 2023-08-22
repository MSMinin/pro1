const router = require("express").Router();
const pCtrl = require("../../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
router.get("/italy", pCtrl.eView.italy);

router.get("/uk", pCtrl.eView.uk);
router.get("/spain", pCtrl.eView.spain);
router.get("/swiss", pCtrl.eView.swiss);

router.get("/image/:fileName", pCtrl.eView.image);

module.exports = router