const express = require("express");

const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

//Register

router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

module.exports = router;
