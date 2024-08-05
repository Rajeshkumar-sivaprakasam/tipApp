const express = require("express");
const { register, login, upload } = require("../controllers/userController");
const router = express.Router();

router.post("/user", upload, register);
router.post("/user/login", login);

module.exports = router;
