const router = require("express").Router();
const pCtrl = require("../../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
router.get("/hongkong", pCtrl.cView.hongkong);


router.get("/beijing", pCtrl.cView.beijing);
router.get("/macau", pCtrl.cView.macau);

router.get("/image/:fileName", pCtrl.cView.image);

module.exports = router