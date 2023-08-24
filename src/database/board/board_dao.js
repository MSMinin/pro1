const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
const ser = require("../../service/board/board_service");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const daoRead = {
    boardList : async (s,e) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select B.* from (select rownum rn, A.* from(
                    select *from proboard order by num desc)A)B
                    where rn between  ${s} and ${e}`;
        const result = await con.execute(sql);
        return result;
    },
    content : async (num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from proboard where num=${num}`;
        const data = await con.execute(sql);
        return data;
    },
    likeCk : async (num, id) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select userid from likes where contnum=${num} and userid='${id}'`;
        const data = await con.execute(sql);
        return data;
    },
    totalContent : async ()=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select count(*) from proboard`;
        const totalContent = await con.execute(sql);
        return totalContent;
    }
}

const daoInsert = {
    write : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into proboard(num, id, title, content, dates) values(proboard_seq.nextval, :id, :title, :content, sysdate)`;
        let result;
        try {
            result = await con.execute(sql, body);
        }catch (err){
            console.log(err);
        }
    },
    likes : async (num, id) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into likes values(${num},'${id}')`;
        let result;
        try {
            result = await con.execute(sql);
        }catch (err){
            console.log(err);
        }
    }
}

const daoUpdate = {
    modify : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update proboard set title='${body.title}', content='${body.content}' where num='${body.num}'`;
        let result;
        try{
            result = await con.execute(sql);
        }catch (err){
            console.log(err);
        }
    },
    upHit : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update proboard set viewcount= viewcount+1 where num=${num}`;
        await con.execute(sql);
    },
    likes : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update proboard set likes=likes+1 where num=${num}`;
        await con.execute(sql);
    }
}

const daoDelete = {
    delete : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `delete from proboard where num=${num}`;
        let result;
        try {
            result = await con.execute(sql);
        } catch (err) {
            console.log(err);
        }
    },
    deleteLike : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `delete from likes where contnum=${num}`;
        await con.execute(sql);
    }
}

module.exports = { daoRead, daoInsert, daoDelete, daoUpdate };