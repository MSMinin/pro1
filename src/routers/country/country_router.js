const router = require("express").Router();
const kRouter = require("./korea/korea_router");
const jRouter = require("./japan/japan_router")

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);

router.use("/korea", kRouter);
router.use("/japan", jRouter);

module.exports = router