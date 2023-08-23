const router = require("express").Router();
const kRouter = require("./korea/korea_router");
const jRouter = require("./japan/japan_router");
const eRouter = require("./europe/europe_router");
//router.get("/k", pCtrl);
////router.get("/k", pCtrl);
router.use("/korea", kRouter);
router.use("/japan", jRouter);
router.use("/europe", eRouter);
module.exports = router