const express = require("express");
const Todo = require("./../models/todoModel");
const auth = require("../middleware/authJWT");

const router = express.Router();

//Get all todo for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.findOne({ userId: req.user.id });
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({
      message: "Enable to get all todos",
    });
  }
});

module.exports = router;
