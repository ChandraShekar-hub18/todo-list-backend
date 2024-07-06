const express = require("express");
const Todo = require("./../models/todoModel");
const auth = require("../middleware/authJWT");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

//Get all todo for logged in user
router.get("/", auth, getAllTodos);

//Create a New Todo
router.post("/", auth, createTodo);

//Update a Todo
router.put("/:id", auth, updateTodo);

//Delete Todo data

router.delete("/:id", auth, deleteTodo);

module.exports = router;
