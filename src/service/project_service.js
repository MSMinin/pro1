const pDAO = require("../database/project_dao");

const pageRead = {
    boardList : async () =>{
        const list = await pDAO.daoRead.boardList();
        console.log("ser Blist: ", list);
        return list.rows;
    },
    content : async (num) => {
        console.log("ser content: ", num);
        await pageUpdate.upHit(num);
        const data = await pDAO.daoRead.content(num);
        if(data.likes)
        console.log("ser content : ", data);
        return data.rows[0];
    },
    totalContent : async () => {
        const totalContent = await pDAO.daoRead.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
    }
}

const getMessage = (msg, url)=> {
    console.log("getMessage", msg);

    return `<script>
                alert("${msg}");
                location.href="${url}"
            </script>`;
}

const pageInsert = {
    write : async (body) => {
        const result = await pDAO.daoInsert.write(body);
        console.log("ser write: ", result);

        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/write_form";
        }else {
            msg="등록되었습니다";
            url="/content/"+body.num;
        }
        return getMessage(msg, url);
    }
}

const pageModify = {
    modify : async (body) => {
        const result = await pDAO.daoUpdate.modify(body);

        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/modify_from?num="+body.num;
        }else {
            msg="수정되었습니다";
            url="/content/"+body.num;
        }
        return getMessage(msg, url);
    }
}

const pageDelete = {
    delete : async (num) => {
        const result = await pDAO.daoDelete.delete(num);

        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/content?num="+body.num;
        }else {
            msg="삭제되었습니다";
            url="/boardList";
        }
        return getMessage(msg, url);
    }
}

const pageUpdate = {
    upHit : async (num)=> {
        await pDAO.daoUpdate.upHit(num);
    },
    likes : async (num, like)=> {
        await pDAO.daoUpdate.likes(num, like);
    }
}

module.exports = {pageRead, pageInsert, pageModify, pageDelete, pageUpdate};