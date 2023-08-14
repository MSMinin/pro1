const pService = require("../service/project_service");

const view = {
    login : (req, res) => {
        console.log(req.session.username)
        res.render("login", {username : req.session.username});
    },
    registerForm : (req, res) => {
        res.render("registerForm");
    }
}
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
    }
}

module.exports = {view, process}