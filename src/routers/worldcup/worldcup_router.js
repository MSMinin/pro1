const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

router.get("/start",pCtrl.view.startWorldCup);
router.get("/start/:id",pCtrl.process.worldcup1); //여기서 1,2갈린다.

router.get("/start/1/:id", pCtrl.process.worldcup2_1);
// 1번을 택했을때 3,4번고르기
router.get("/start/2/:id", pCtrl.process.worldcup2_2);
// 2번을 택했을때 3,4번고르기

router.get("/start/1/3/:id", pCtrl.process.worldcup3_1);
//1번, 3번 고르고 5,6고르기 (끝)
router.get("/start/2/3/:id", pCtrl.process.worldcup3_2);
//2번, 3번 고르고 5,6 고르기 (끝)

router.get("/start/1/4/:id", pCtrl.process.worldcup4_1);
//1번, 4번 고르고 7,8고르기 (끝)
router.get("/start/2/4/:id", pCtrl.process.worldcup4_2);
//2번, 4번 고르고 7,8 고르기 (끝)

router.get("/image/:fileName", pCtrl.view.image);

module.exports = router;