import express from "express";
import routes from "./routes";
const cors = require("cors");


const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(5550);