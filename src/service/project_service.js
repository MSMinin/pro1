const pDAO = require("../database/project_dao");

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
const getMessage = (msg, url)=>{
    return `<script>
        alert("${msg}");
        location.href="${url}";
    </script>`;
}

module.exports = {worldcupCheck, getList}
