const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");
const { chgPwdForm } = require("../service/project_service");


oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

loginChk = async (id) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from proMember where id = '${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows;
}

const register = async ( body ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = "insert into proMember values(:id, :pwd, :name, :addr, :pNumber, :birth)";
    let result;
    
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}  

infoChk = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.username);
    const sql = `select * from proMember where id = '${params.username}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

modifyForm = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.id);
    const sql = `select * from proMember where id = '${params.id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

modify = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 body.id : ",body.id);
    const sql = `update proMember set pwd = '${body.pwd}', name = '${body.name}' , addr = '${body.addr}',
                 p_number= '${body.pNumber}' , birth = '${body.birth}'  where id = '${body.id}'`;
    console.log(sql);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(result);
    return result;
}

deleteM = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = ` delete from proMember where id = :id`;
    
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err) {
        console.log(err);
    }
    return result;
}
findId = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select id from proMember where name = '${body.name}' and p_number = '${body.pNumber}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log("쿼리로 받아온 내용들",member);
    return member.rows;

}

chgPassword = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.id);
    const sql = `select id, pwd from proMember where id = '${params.id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

chgPwd = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 body.id : ",body.id);
    const sql = `update proMember set pwd = '${body.pwd}' where id = '${body.id}'`;
    console.log(sql);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(result);
    return result;
}

const getList = async ()=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from worldcup`;
    console.log((await con.execute(sql)).rows);
    return (await con.execute(sql)).rows;
}
const getHtml = async (num)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from cAdd where n_id='${num}'`;
    let result;
    try{
        result =  await con.execute(sql, num);
    }catch(err){
        console.log(err);
    }
    return result;
}

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

module.exports = { loginChk, register, infoChk,modifyForm, modify, deleteM, findId, chgPassword, chgPwd, getList, getHtml, daoRead, daoInsert, daoDelete, daoUpdate};
