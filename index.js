console.log(" starting to work");
//express server
const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

//api

// server.use("/api", require("./routes"));

//connect to DB
const client = require("./database");

//connect to the server
const PORT = 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open");
  } catch (error) {
    console.error("Database is closed", error);
  }
});
