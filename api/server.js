const express = require("express");
const server = express();

const accountsRouter = require("./accounts-router");

server.use(express.json());
server.use("/accounts", accountsRouter);

module.exports = server;
