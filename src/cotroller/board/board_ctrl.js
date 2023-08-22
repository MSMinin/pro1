const ser = require("../../service/board/board_service");

const views = {
    boardList : async (req, res) => {
        console.log("ctrl start", req.query.start);
        // const list = await ser.pageRead.boardList();
        // console.log("ctrl list", list);
        const totalContent = await ser.pageRead.totalContent();
        const data = await ser.pageRead.boardList(req.query.start, totalContent);
        console.log(data);
        res.render("board/boardList", { list : data.list, 
            start : data.start, page : data.page, totalContent, username : req.session.username});
    },
    
    writeForm : (req, res) =>{
        console.log("ctrl writeForm", req.params);
        console.log("ctrl writeForm", req.session.username);
        res.render("board/write_form", { content: req.params,  username : req.session.username});
    },
    modifyForm : async(req, res) =>{
        console.log("ctrl modifyForm: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        res.render("board/modify_form", {result, username : req.session.username});
    },
    content : async(req, res)=> {
        console.log("ctrl content: ", req.params.num);
        console.log("ctrl content22: ", req.session.username);
        const result = await ser.pageRead.content(req.params.num);
        const data = await ser.pageRead.likeCk(req.params.num, req.session.username);
        console.log("ctrl result: ", result);
        console.log("ctrl data: ", data.rows[0]);
        res.render("board/content", {result, data: data.rows[0], username : req.session.username});
    }
}


const process  = {
    write : async (req, res) => {
        console.log("ctrl write: ", req.body);
        const msg = await ser.pageInsert.write(req.body);
        res.send(msg);
    },
    modify : async (req, res) => {
        console.log("ctrl modify", req.body);
        const msg = await ser.pageModify.modify(req.body);
        res.send(msg);
    },
    delete : async (req, res)=> {
        console.log("ctrl delete", req.params.num);
        const msg = await ser.pageDelete.delete(req.params.num);
        res.send(msg);
    },
    likes : async (req, res)=>{
        console.log("ctrl likes", req.body.likes);
        console.log("ctrl likes", req.session.username);
        console.log("ctrl likes", req.body.num);
        await ser.pageInsert.likes(req.body.num, req.session.username);
        res.redirect("/content/"+ req.body.num);
    }
}

module.exports = {views, process};