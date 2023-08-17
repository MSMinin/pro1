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
    },
    worldcup1 : async(req, res) => {
        const nlist = await pService.getList();
        //console.log("nlist : ",nlist);
        res.render("worldcup/worldcup1", {nlist});
    },
    worldcup2 : (req, res) => {
        res.redirect("/worldcup/1");
    }
}


var list = {};
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
    },


    // dh
    worldcup1 : async(req, res) => {
        //console.log("w1 : ",req.params["id"]);
        list.NUM1 = req.params["id"];
        //console.log("w1 list : ",list);
        const nlist = await pService.getList();
        res.render("worldcup/worldcup2", {nlist});
    },
    worldcup2 : async(req, res) => {
        //console.log("w2 : ",req.params["id"]);
        list.NUM2 = req.params["id"];
        //console.log("w2 list : ",list);
        const nlist = await pService.getList();
        console.log("w2 : ",nlist);
        if(req.params["id"]==="nature"){
            res.render("worldcup/worldcup3", {nlist});
        }else{
            res.render("worldcup/worldcup4", {nlist});
        }
    },
    worldcup3 : async(req, res) => {
        console.log("w3 : ",req.params["id"]);
        list.NUM3 = req.params["id"];
        console.log("w3 list : ",list);
        //pService.worldcupCheck(res.params);
    },
    worldcup4 : async(req, res) => {
        console.log("w3 : ",req.params["id"]);
        list.NUM3 = req.params["id"];
        console.log("w3 list : ",list);
        //pService.worldcupCheck(res.params);
    },
    worldcupCheck : async(req, res) => {
        //console.log("w4 : ",res.params);
        //const msgPack = await pService.worldcupCheck(req.params);
        //res.send(msgPack.msg);
    }
}

module.exports = {views, process}