const { client } = require("./index");

async function buildTables(){
    
    try{
    client.connect();
    await client.query(`
    DROP TABLE IF EXISTS 
    `)
   
    } catch (error) {

    }
}