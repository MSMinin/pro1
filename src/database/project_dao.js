const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");
<<<<<<< HEAD

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const daoLogin = async (id) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from proMember where id = '${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    return member;
}

const register = async ( body ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = "insert into proMember values(:id, :password, :name, :addr, :phoneNumber, :birth)";
    let result;
    console.log("asdasda", body);
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}  

const getList = async (username) => {
    console.log("dao username", username)
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from proMember where id = '${username}'`;
    let result;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log("dao, list", result);
    return result;
}

module.exports = { daoLogin, register, getList};
=======
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const getList = async ()=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from worldcup`;
    return (await con.execute(sql)).rows;
}

module.exports = {getList}
>>>>>>> yujin
