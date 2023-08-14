const pDAO = require("../database/project_dao");
const process = {
    loginChk : async (body) => {
        let member = await pDAO.daoLogin(body.id);
        let msg = "", url ="", msgPack= {};
        if(member.rows.length === 1) {
            member = member.rows[0];
            if(member.PWD === body.pwd) {
                msg = member.NAME + "님 환영합니다."
                url = "/";
                msgPack.result = 0 ;
            }else {
                msg = "비밀번호가 틀렸습니다."
                url = "/";
            }
        }else {
            msg = "해당하는 id가 존재하지 않습니다."
            url = "/";
        }
        msgPack.msg = getMessage(msg, url);
        return msgPack;
    },
    register : async ( body )=>{
        let result = await pDAO.register( body );
        let msg="", url="";
        console.log("result : ", result);
        if(result !== undefined){      
            msg = `${body.name}님 회원가입 성공`;
            url = "/";
            
        }else{
            msg = "문제가 발생했습니다.";
            url = '/project/registerForm';
        }
        return getMessage(msg, url);
    },
    getList : async (username) => {
        let result = await pDAO.getList(username);
        console.log("service username",username)
        console.log("service result ", result.rows[0].ID)
        let msg="", url ="", msgPack ={};
        if(username) {
            msgPack.msg = `<script>
                     msg = "<fieldset><%-include('./list_view.ejs')%></fieldset>";
                     document.querySelector("#mainDiv").innerHTML = msg;
                   </script>`
            msgPack.result = result.rows[0];
        }else {
            msg = "먼저 로그인해주세요.";
            url ="/";
            msgPack.msg = getMessage(msg, url);
        }
        
        return msgPack;
    }
}

const getMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

module.exports = {process};