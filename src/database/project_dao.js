const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const getList = async ()=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from worldcup`;
    return (await con.execute(sql)).rows;
}

module.exports = {getList}