const client = require("./index");
const { createInitialUsers } = require("./users");
const { createInitialPayers } = require("./payers");
async function buildTables() {
  client.connect();

  console.log("Building tables");
  try {
    await client.query(/*sql*/ `
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS payers;
    DROP TABLE IF EXISTS users;
    `);

    console.log("finished dropping");

    await client.query(/*sql*/ `
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        balance INTEGER
    );
    
    CREATE TABLE payers(
        id SERIAL PRIMARY KEY,
        payername VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE transactions(
        id SERIAL PRIMARY KEY,
        "payerID" INTEGER REFERENCES payers(id),
        points INTEGER,
        "time" TIMESTAMP WITH TIME ZONE
    ); 
`);
  } catch (error) {
    console.log("error building tables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createInitialUsers();
    await createInitialPayers();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
