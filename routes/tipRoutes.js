const express = require("express");
const { calculateTip, getTips } = require("../controllers/tipController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/tip/calculate", protect, calculateTip);
router.get("/tip", protect, getTips);

module.exports = router;
