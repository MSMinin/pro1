const pService = require("../service/project_service");
const cService = require("../service/country_service");
const ser = require("../service/board/board_service");

const fs = require("fs");
const fileList = fs.readdirSync("./src/image");
const fileList2 = fs.readdirSync("./src/views/data1/images");
const fileList3 = fs.readdirSync("./src/image/country/korea");
const fileList4 = fs.readdirSync("./src/image/country/japan");

const view = {
    loginForm : (req, res) => {
        res.render("member/loginForm", {username : req.session.username});
    },

    registerForm : (req, res) => {
        res.render("member/registerForm");
    }, 
    infoChk : async (req, res) => {
        
        res.render("member/infoChk", {info : undefined, list : undefined,username : req.session.username})
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
        res.render("member/infoChk", {info : mlist, username : req.session.username})
    },
    
    modifyM : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await pService.modifyM(req.body);
        res.send(msg);
    },

    delete : async (req, res) => {
        console.log("req.params", req.params);
        // await pService.deleteLike(req.params);
        // await pService.deleteChild(req.params);
        const msg = await pService.deleteM(req.params);
        req.session.destroy();
        res.clearCookie("isLogin");
        res.send(msg);
    },
    findId : async (req, res) => {
        console.log(req.body);
        const idList = await pService.findId(req.body);
        console.log("서비스에서 받아온 idList", idList);
        res.render("member/idList", {list : idList});
    },
    chgPassword : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await pService.chgPassword(req.params);
        res.render("member/chgPwdForm", {list : mlist})
    },
    chgPwd : async (req, res) => {
        const msg = await pService.chgPwd(req.params, req.body);
        res.send(msg);
    },
    
    information : async (req, res) => {
        console.log("비밀번호 확인", req.body);
        console.log("세션 확인", req.session.username);
        const info = await pService.information(req.body, req.session.username);
        const board = await ser.pageRead.myRead(req.session.username);
        const data = await ser.pageRead.boardList(req.query.start, board, req.session.username);
        console.log("결과1",info)
        console.log("결과2",data.list)
        res.render("member/infoChk", {info : info, list : data.list, start : data.start, page : data.page, username : req.session.username} )

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
    }
}
const jView ={
    tokyo : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/japan/tokyo", {username : req.session.username, files : fileList4});
    },
    osaka : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/japan/osaka", {username : req.session.username, files : fileList4});
    },
    sapporo : async(req, res) => {
        //const weather = await cService.getHtml();
        res.render("country/japan/sapporo", {username : req.session.username, files : fileList4});
    },
    image : (req, res) => {
        let filePath = `./src/image/country/japan/${req.params.fileName}`;
        res.download(filePath);
    }
}
const kView={
    seoul : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/seoul", {username : req.session.username, files : fileList3});
    },
    daegu : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/daegu", {username : req.session.username, files : fileList3});
    },
    busan : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/busan", {username : req.session.username, files : fileList3});
    },
    gangneung : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/gangneung", {username : req.session.username, files : fileList3});
    },
    gyeongju : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/gyeongju", {username : req.session.username, files : fileList3});
    },
    jeonju : async(req, res) => {
        //const weather = await cService.getHtml();
        

        res.render("country/korea/jeonju", {username : req.session.username, files : fileList3});
    },
    image : (req, res) => {
        let filePath = `./src/image/country/korea/${req.params.fileName}`;
        res.download(filePath);
    }
}
const banner={
    index : (req, res) => {
        res.render("index", {username : req.session.username,files : fileList2});
    },
    image : (req, res) => {
        let filePath = `./src/views/data1/images/${req.params.fileName}`;
        res.download(filePath);
    }
}

module.exports = {view, process, jView, kView, banner}
