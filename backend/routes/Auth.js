const express=require("express")
const router = express.Router();
const User = require("../models/User");

router.post("/signin", async (req, res) => {
  const { username,email,password } = req.body;
  const newUser = new User({
      username,
      email,
      password
    });

  await newUser.save();

  console.log(newUser);

  res.status(200).json({
    message: "Signin route working"
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      username: existingUser.username
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;