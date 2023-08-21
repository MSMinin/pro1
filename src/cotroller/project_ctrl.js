const pService = require("../service/project_service");
const cService = require("../service/country_service");

const fs = require("fs");
const fileList = fs.readdirSync("./src/image");
const fileList2 = fs.readdirSync("./src/image/country");
const fileList3 = fs.readdirSync("./src/views/data1/images");

const view = {
    loginForm : (req, res) => {
        res.render("member/loginForm", {username : req.session.username});
    },

    registerForm : (req, res) => {
        res.render("member/registerForm");
    },

    find : (req, res) => {
        res.render("member/find");
    },
    startWorldCup : async(req, res) => {
        const nlist = await pService.getList();
        //console.log("nlist : ",nlist);
        res.render("worldcup/worldcup1", {nlist, files : fileList, username : req.session.username});
    },

    worldcup2 : (req, res) => {
        res.redirect("/worldcup/1");
    }, 
    main : (req, res)=> {
        res.render("main");
    },
    login : (req, res) => {
        res.render("login");
    },
    image : (req, res) => {
        let filePath = `./src/image/${req.params.fileName}`;
        res.download(filePath);
    }
}

var list = {};
const process  = {
    login : async (req, res) => {
        const msgPack = await pService.loginChk(req.body);
        if(msgPack.result === 0) {
            req.session.username = req.body.id;
        }
        res.send(msgPack.msg);
    },
    loginChk : async (req, res) => {
        console.log("req.body : ", req.body);
    },
    register : async (req, res) => {
        console.log(req.body);
        const msg = await pService.register(req.body);
        console.log(msg);
        res.send(msg);
    },

    logout : (req, res) => {
        const msg = pService.logout(req, res);
        res.send(msg);
    },
    
    infoChk : async (req, res) => {
        console.log("req.parmas : ", req.params);
        const mlist = await pService.infoChk(req.params);
        console.log("서비스에서 받아온 mlist(result) : ",mlist);
        res.render("member/infoChk", {list : mlist, username : req.session.username})
    },
    
    modifyForm : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await pService.modifyForm(req.params);
        res.render("member/modifyForm", {list : mlist, username : req.session.username,})
    },
    
    modifyM : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await pService.modifyM(req.body);
        res.send(msg);
    },

    delete : async (req, res) => {
        console.log("req.params", req.params);
        req.session.destroy();
        res.clearCookie("isLogin");
        const msg = await pService.deleteM(req.params);
        res.send(msg);
    },
    findId : async (req, res) => {
        console.log(req.body);
        const idList = await pService.findId(req.body);
        console.log("서비스에서 받아온 idList", idList);
        res.render("member/idList", {list : idList});
    },
    chgPwdForm : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await pService.chgPassword(req.params);
        res.render("member/chgPwdForm", {list : mlist})
    },
    chgPwd : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await pService.chgPwd(req.body);
        res.send(msg);
    },

    worldcup1 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 1) {
            res.render("worldcup/worldcup2_1", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 2) {
            res.render("worldcup/worldcup2_2", {nlist, files : fileList, username : req.session.username});
        } 
    },

    worldcup2_1 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        console.log("w2 : ",nlist);
        if(req.params.id == 3) {
            res.render("worldcup/worldcup3_1", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 4) {
            res.render("worldcup/worldcup3_2", {nlist, files : fileList, username : req.session.username});
        } 
    },

    worldcup2_2 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 3) {
            res.render("worldcup/worldcup3_3", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 4) {
            res.render("worldcup/worldcup3_4", {nlist, files : fileList, username : req.session.username});
        } 
    },

    worldcup3_1 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 5) {
            res.render("worldcup/result1_3_5", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 6) {
            res.render("worldcup/result1_3_6", {nlist, files : fileList, username : req.session.username});
        } 
    },
    worldcup3_2 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 5) {
            res.render("worldcup/result2_3_5", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 6) {
            res.render("worldcup/result2_3_6", {nlist, files : fileList, username : req.session.username});
        } 
    },

    worldcup4_1 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 7) {
            res.render("worldcup/result1_4_7", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 8) {
            res.render("worldcup/result1_4_8", {nlist, files : fileList, username : req.session.username});
        } 
    },
    
    worldcup4_2 : async(req, res) => {
        console.log("req.params.ID 체크 : ",req.params.id);
        list.NUM1 = req.params["id"];
        const nlist = await pService.getList();
        if(req.params.id == 7) {
            res.render("worldcup/result2_4_7", {nlist, files : fileList, username : req.session.username});
        }else if(req.params.id  == 8) {
            res.render("worldcup/result2_4_8", {nlist, files : fileList, username : req.session.username});
        } 
    },
    banner : (req, res) => {
        let filePath = `./src/views/data1/images/${req.params.fileName}`;
        res.download(filePath);
    }

}
const cView ={
    tokyo : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/tokyo", {username : req.session.username, files : fileList2});
    },
    osaka : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/osaka", {username : req.session.username, files : fileList2});
    },
    sapporo : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/sapporo", {username : req.session.username, files : fileList2});
    },
    image : (req, res) => {
        let filePath = `./src/image/country/${req.params.fileName}`;
        res.download(filePath);
    },
    seoul : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/seoul", {username : req.session.username, files : fileList2});
    },
    daegu : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/daegu", {username : req.session.username, files : fileList2});
    },
    busan : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/busan", {username : req.session.username, files : fileList2});
    },
    gangneung : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/gangneung", {username : req.session.username, files : fileList2});
    },
    gyeongju : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/gyeongju", {username : req.session.username, files : fileList2});
    },
    jeonju : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/jeonju", {username : req.session.username, files : fileList2});
    },
}

module.exports = {view, process, cView}
