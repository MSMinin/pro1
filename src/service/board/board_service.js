const pDAO = require("../../database/board/board_dao");


const pageOperation = (start, totalCount) =>{
    page = {};
    const pageNum = 10;  // 페이지당 보여줄 글 개수
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
    content : async (num) => {
        console.log("ser content: ", num);
        await pageUpdate.upHit(num);
        const data = await pDAO.daoRead.content(num);
        console.log("ser content : ", data);
        return data.rows[0];
    },
    totalContent : async () => {
        const totalContent = await pDAO.daoRead.totalContent();
        console.log( totalContent );
        return totalContent.rows[0]['COUNT(*)'];
    }
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


getMessage = (msg, url) => {
    return `<script>
                alert('${msg}');
                location.href = '${url}';
            </script>`
}

module.exports = {pageRead, pageInsert, pageModify, pageDelete, pageUpdate};