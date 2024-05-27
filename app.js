const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todosRoutes = require("./routes/todos");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

module.exports = app;
