const pService = require("../service/project_service");

const view = {
    login : (req, res) => {
<<<<<<< HEAD
        console.log(req.session.username)
        res.render("login", {username : req.session.username});
    },
    registerForm : (req, res) => {
        res.render("registerForm");
=======
        res.render("login");
    },
    worldcup1 : async(req, res) => {
        const nlist = await pService.getList();
        //console.log("nlist : ",nlist);
        res.render("worldcup/worldcup1", {nlist});
    },
    worldcup2 : (req, res) => {
        res.redirect("/worldcup/1");
>>>>>>> yujin
    }
}
var list = {};
const process  = {
        loginChk : async (req, res) => {
        console.log("== ctrl logincheck ===")
        console.log(req.body);
        const msgPack = await pService.process.loginChk(req.body);
        console.log("msgPack : ",msgPack);
        console.log("msgPack.result : ",msgPack.result);

        if(msgPack.result === 0) {
            req.session.username = req.body.id;
        }
        res.send(msgPack.msg);
    },
    register : async (req, res) => {
        console.log("req.body : ", req.body);
<<<<<<< HEAD
        const msg = await pService.process.register(req.body);
        res.send(msg);
    },
    logout : (req, res) => {
        req.session.destroy();
        res.clearCookie("isLogin");
        res.redirect("/");
    },
    list : async (req, res) => {
        console.log("sessionChk : ", req.session.username);
        const result = await pService.process.getList(req.session.username);
        console.log("ctrl result : ",result);
        res.send(result.msg);
=======
        
    },
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
>>>>>>> yujin
    }
}

module.exports = {view, process}