const router = require("express").Router();
const pCtrl = require("../../cotroller/board/board_ctrl");

// 게시판 리스트
router.get("/boardList", pCtrl.views.boardList);

// 글 상세정보
router.get("/content/:num", pCtrl.views.content);

// 글 작성폼, 작성내용 db저장
router.get("/write_form", pCtrl.views.writeForm);
router.post("/write", pCtrl.process.write);

// 글 수정 폼, 수정 내용 db저장
router.get("/modify_form/:num", pCtrl.views.modifyForm);
router.post("/modify", pCtrl.process.modify);

// 글 삭제
router.get("/delete/:num", pCtrl.process.delete);

// 좋아요 버튼
router.post("/likes", pCtrl.process.likes);

module.exports = router;