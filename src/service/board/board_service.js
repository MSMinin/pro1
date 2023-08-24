const pDAO = require("../../database/board/board_dao");


const pageOperation = (start, totalCount) =>{
    page = {};
    const pageNum = 5;  // 페이지당 보여줄 글 개수
    const num = (totalCount % pageNum === 0)? 0:1;
    page.totPage = parseInt( totalCount / pageNum) + num;
    page.startNum = (start -1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}

const pageRead = {
    boardList : async (start, total) =>{
        start = (start && start >= 1)? Number(start):1;

        const page = pageOperation(start, total);
        const list = await pDAO.daoRead.boardList(page.startNum, page.endNum);
        console.log("ser list: ", list);

        let data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        console.log("ser data : ", data);
        return data;
    },
    myBoard : async (start, total, session) =>{
        start = (start && start >= 1)? Number(start):1;

        const page = pageOperation(start, total);
        const list = await pDAO.daoRead.myBoard(page.startNum, page.endNum, session);
        console.log("ser list: ", list);

        let data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;
        console.log("ser data22 : ", data);
        return data;
    },
    myRead : async (session) =>{
        const myRead = await pDAO.daoRead.myRead(session);
        console.log("서비스 myRead", myRead.rows[0]['COUNT(*)'] );
        return myRead.rows[0]['COUNT(*)'];
    },
    content : async (num) => {
        console.log("ser content: ", num);
        await pageUpdate.upHit(num);
        const data = await pDAO.daoRead.content(num);
        console.log("ser cont data : ", data.rows[0]);
        
        return data.rows[0];
    },
    likeCk: async (num, id) => {
        console.log("ser content: ", num);
        console.log("ser content: ", id);
        const likeCk = await pDAO.daoRead.likeCk(num,id);
        console.log("ser cont likeCk : ", likeCk);
        return likeCk;
    },
    totalContent : async () => {
        const totalContent = await pDAO.daoRead.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
    }
}


const pageInsert = {
    write : async (body) => {
        console.log("ser wirte", body);
        const result = await pDAO.daoInsert.write(body);
        console.log("ser write: ", result);

        let msg="", url="";
        if (result == 0){
            msg="문제 발생";
            url="/write_form";
        }else {
            msg="등록되었습니다";
            url="/boardList";
        }
        return getMessage(msg, url);
    },
    likes : async (num, id) => {
        console.log("ser likes id", id);
        console.log("ser likes num", num);
        await pageUpdate.likes(num);
        await pDAO.daoInsert.likes(num, id);
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
        await pDAO.daoDelete.deleteLike(num);
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
    likes : async (num)=> {
        await pDAO.daoUpdate.likes(num);
    }
}

getMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

module.exports = {pageRead, pageInsert, pageModify, pageDelete, pageUpdate};