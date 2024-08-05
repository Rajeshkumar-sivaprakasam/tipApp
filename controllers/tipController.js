const Tip = require("../models/Tip");

// Helper function to parse date strings in dd-mm-yyyy format
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
};

exports.calculateTip = async (req, res) => {
  const { place, totalAmount, tipPercentage } = req.body;

  if (!place || !totalAmount || !tipPercentage) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const tipAmount = (totalAmount * tipPercentage) / 100;

  try {
    const tip = new Tip({
      user: req.user.id,
      place,
      totalAmount,
      tipAmount,
      date: new Date(), // Add current date when creating a new tip
    });

    await tip.save();

    res.status(200).json({ tip: tipAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTips = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Both startDate and endDate are required" });
  }

  try {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    end.setHours(23, 59, 59, 999); // Set to the end of the endDate day

    // Fetch tips from the database
    const tips = await Tip.find({
      user: req.user.id,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    // Transform the data to match the required format
    const formattedTips = tips.map((tip) => ({
      place: tip.place,
      totalAmount: tip.totalAmount,
      tipAmount: tip.tipAmount,
    }));

    // Send the response
    res.status(200).json(formattedTips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
