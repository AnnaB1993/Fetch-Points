console.log(" starting to work")
//express server
const express = require("express");
const server = express();
 
const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json())


//api

server.use("/api", require("./routes"));

//connect to DB
const client = require("./database/index");