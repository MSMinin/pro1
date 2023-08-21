const ser = require("../../service/board/board_service");

const views = {
    boardList : async (req, res) => {
        console.log("ctrl start", req.query.start);
        // const list = await ser.pageRead.boardList();
        // console.log("ctrl list", list);
        const totalContent = await ser.pageRead.totalContent();
        const data = await ser.pageRead.boardList(req.query.start, totalContent);
        res.render("board/boardList", { list : data.list, 
            start : data.start, page : data.page, totalContent, username : req.session.username});
    },
    writeForm : (req, res) =>{
        console.log("ctrl writeForm", req.params);
        console.log("ctrl writeForm", req.session.username);
        res.render("board/write_form", { content: req.params,  username : req.session.username});
    },
    modifyForm : async(req, res) =>{
        let msg = "", url = "";
        console.log("ctrl modifyForm: ", req.params);
        console.log("modifyform이동시 session 확인", req.session.username)
        const id = await ser.getId(req.params.num);
        console.log("받아온 id", id);
        if(id.ID === req.session.username) {
            const result = await ser.pageRead.content(req.params.num);
            res.render("board/modify_form", {result, username : req.session.username});
        }else {
            msg = "다른 유저의 게시물을 수정할 수 없습니다."
            url = "/content/"+req.params.num;
            res.send(message(msg, url));
        }
        
    },
    content : async(req, res)=> {
        console.log("ctrl content: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        console.log(result);
        res.render("board/content", {result, username : req.session.username});
    }
}

const process  = {
    write : async (req, res) => {
        console.log("ctrl write: ", req.body);
        const msg = await ser.pageInsert.write(req.body, req.session.username);
        res.send(msg);
    },
    modify : async (req, res) => {
        const msg = await ser.pageModify.modify(req.session.username, req.body);
        res.send(msg);
    },
    delete : async (req, res)=> {
        console.log("ctrl delete", req.params);
        const id = await ser.getId(req.params.num);
        console.log("서비스에서 받아온 id : ", id);
        console.log("서비스에서 받아온 id.ID : ", id.ID);
        console.log("session 확인용 : ", req.session.username);
       
        const msg = await ser.pageDelete.delete(id.ID, req.params.num, req.session.username);
        res.send(msg);
        
    },
    likes : async (req, res)=>{
        console.log("ctrl likes", req.body.likes);
        console.log("ctrl likes", req.body.num);
        const msg = await ser.pageUpdate.likes(req.body.num);
        res.redirect("/content/"+ req.body.num);
    }
}

const message = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

module.exports = {views, process};