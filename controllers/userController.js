const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("proPic");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new User({
      name,
      proPic: req.file.path,
      email,
      password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    res.status(201).json({
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.loggedIn) {
      // Logic to handle logging out from other devices if already logged in
    }

    user.loggedIn = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    res.status(200).json({
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
