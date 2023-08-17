const pDAO = require("../database/project_dao");  

loginChk = async (body) => {
    let member = await pDAO.loginChk(body.id);
    console.log("로그인시", member);
    let msg = "", url ="", msgPack= {};
    console.log(member[0])
    if(member.length === 1) {
        member = member[0];
        if(member.PWD === body.pwd) {
            msg = member.NAME + "님 환영합니다."
            url = "/";
            msgPack.result = 0 ;
        }else {
            msg = "비밀번호가 틀렸습니다."
            url = "/member/loginForm";
        }
    }else {
        msg = "해당하는 id가 존재하지 않습니다."
        url = "/member/loginForm";
    }
        msgPack.msg = getMessage(msg, url);
        return msgPack;
}

getMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

register = async (body) => {
    let result = await pDAO.register( body );
    let msg="", url="";
    if(result !== undefined){      
        msg = `${body.name}님 회원가입 성공`;
        url = ""; 
        num = 1;
    }else{
        msg = "문제가 발생했습니다.";
        url = '/member/registerForm';
        num = 0;
    }
    return getMessage(msg, url, num);
}

logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("isLogin");
    let msg = "로그아웃되었습니다."
    url = "/"
    return getMessage(msg, url);
}

infoChk = async (params) => {
    let result = await pDAO.infoChk(params);
    console.log("dao에서 받아온 result : ", result);
    return result;
}

modifyForm = async (params) => {
    let result = await pDAO.modifyForm(params);
    console.log("dao에서 받아온 result : ", result);
    return result;
}

modify = async (body)=> {
    console.log("컨트롤에서 받아온 body", body);
    let result = await pDAO.modify(body);
    let msg = "", url = "";
    if(result ===0) {
        msg = "문제 발생";
        url = "/member/modifyForm/" + body.id;
    }else {
        msg = "수정 완료";
        url = "/member/infoChk/" + body.id;
    }
    return getMessage(msg, url);
}

deleteM = async (body)=> {
    console.log("컨트롤에서 받아온 body", body);
    const result = await pDAO.deleteM(body);
    let msg ="", url ="";
    if(result == 0) {
        msg = "문제 발생";
        url = "/member/informationChk/" + body.id;
    }else {
        msg = "삭제 완료";
        url = "/";
    }
    return getMessage(msg,url);
}

findId = async (body) => {
    console.log("컨트롤에서 받아온 body : ", body);
    var result = await pDAO.findId(body);
    console.log("dao에서 받아온 result", result);
    return result;
}

chgPassword = async (params) => {
    let result = await pDAO.chgPassword(params);
    console.log("dao에서 받아온 result : ", result);
    return result;
}

chgPwd = async (body) => {
    console.log("컨트롤에서 받아온 body", body);
    let result = await pDAO.chgPwd(body);
    let msg = "", url = "", num;
    if(result ===0) {
        msg = "문제 발생";
        url = "/member/chgPwdForm/" + body.id;
        num = 0;
    }else {
        msg = "비밀번호 변경 완료";
        url = "/member/infoChk/" + body.id;
        num = 1;
    }
    return getMessage(msg, url, num);
}

getMessage = (msg, url, num) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
                if(${num} == 1) {
                    window.close();
                }
            </script>`
}


const getList = ()=>{
    return pDAO.getList();
}

const worldcupCheck = async(params) => {
    let msg="", url="", msgPack={};
    if(list.num1==="near"){
        if(list.num2==="nature"){
            if(list.num3==="mountain"){
                msg=list.country;
                url="worldcup/result";
            }else if(list.num3==="ocean"){
                msg=list.country;
                url="worldcup/result";
            }
        }else{
            if(list.num3==="tour"){
                msg=list.country;
                url="worldcup/result";
            }else if(list.num3==="food"){
                msg=list.country;
                url="worldcup/result";
            }
        }
    }else{
        if(list.num2==="nature"){
            if(list.num3==="mountain"){
                msg=list.country;
                url="worldcup/result";
            }else if(list.num3==="ocean"){
                msg=list.country;
                url="worldcup/result";
            }
        }else{
            if(list.num3==="tour"){
                msg=list.country;
                url="worldcup/result";
            }else if(list.num3==="food"){
                msg=list.country;
                url="worldcup/result";
            }
        }
    }
    console.log("msg : ", msg);
    //msgPack.msg = getMessage(msg, url);
    return msgPack;
}

module.exports = {loginChk, register, logout, infoChk, modifyForm, modify, deleteM, findId, chgPassword, chgPwd, worldcupCheck, getList}