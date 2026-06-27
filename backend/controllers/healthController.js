import User from "../models/User.js";

export const getHealthData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email healthData");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHealthData = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { healthData: req.body },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
