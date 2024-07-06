const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

exports.registerUser = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  //   console.log(username, email, password);

  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exists",
      });

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await newUser.save();
    res.status(201).json({
      message: "User is created",
      UserId: newUser.message,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error. Unable to register",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid credentials!!💥💥",
      });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials!!",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
