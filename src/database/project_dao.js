const oracledb = require("oracledb");
const dbConfig = require("../../../pro1/config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const daoRead = {
    boardList : async () => {
        const con = await oracledb.getConnection(dbConfig);
        const result = await con.execute("select * from proboard order by num desc");
        console.log("dao", result);
        return result;
    },
    content : async (num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from proBoard where num='${num}'`;
        const data = await con.execute(sql);
        return data;
    },
    totalContent : async ()=>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select count(*) from proBoard`;
        const totalContent = await con.execute(sql);
        return totalContent;
    }
}

const daoInsert = {
    write : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        //const sql = `insert into proboard(num, id, title, content, dates, filename) values(proboard_seq.nextval, :id, :title, :content, sysdate, :filename)`;
        const sql = `insert into proboard(num, id, title, content, dates) values(proboard_seq.nextval, :id, :title, :content, sysdate)`;
        let result;
        try {
            result = await con.execute(sql, body);
        }catch (err){
            console.log(err);
        }
    }
}

const daoUpdate = {
    modify : async (body) => {
        const con = await oracledb.getConnection(dbConfig);
        //const sql = `update proboard set title='${body.title}', content='${body.content}, filename='${body.filename}' where num='${body.num}`;
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
    likes : async (num, like) => {
        const con = await oracledb.getConnection(dbConfig);
        var sql;
        if (like == 1){
            sql = `update proboard set likes=likes+1 where num=${num}`;
        }else {
            sql = `update proboard set likes=likes-1 where num=${num}`;
        }
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
    }
}

module.exports = {daoRead, daoInsert, daoDelete, daoUpdate};