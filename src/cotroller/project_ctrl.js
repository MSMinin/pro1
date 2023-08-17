const ser = require("../service/project_service");

const views = {
    main : (req, res)=> {
        res.render("main");
    },
    login : (req, res) => {
        res.render("login");
    },
    boardList : async (req, res) => {
        const list = await ser.pageRead.boardList();
        console.log(list);
        const totalContent = await ser.pageRead.totalContent();
        // const data = await ser.pageRead.list(req.query.start, totalContent);
        res.render("board/boardList", {list, totalContent});
    },
    writeForm : (req, res) =>{
        console.log("ctrl writeForm", req.params);
        res.render("board/write_form", req.params);
    },
    modifyForm : async(req, res) =>{
        console.log("ctrl modifyForm: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        res.render("board/modify_form", {result});
    },
    content : async(req, res)=> {
        console.log("ctrl content: ", req.params.num);
        const result = await ser.pageRead.content(req.params.num);
        console.log(result);
        res.render("board/content", {result});
    }
}
const process  = {
    loginChk : async (req, res) => {
        console.log("req.body : ", req.body);
    },
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
        console.log("ctrl likes", req.body.num);

        var like= req.body.like;
        if(like === "좋아요"){
            result = 1;
        }else {
            result = 0;
        }
        const msg = await ser.pageUpdate.likes(req.body.num, result);
        res.redirect("/content/"+ req.body.num);
    }
}

module.exports = {views, process}