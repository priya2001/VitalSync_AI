import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  healthData: {
    heartRate: { type: Number, default: 72 },
    steps: { type: Number, default: 8200 },
    focus: { type: Number, default: 5 },
    calories: { type: Number, default: 480 },
    aiScore: { type: Number, default: 70 },
    productivity: { type: Number, default: 65 },
    weeklyTrend: { type: [Number], default: [75, 65, 80, 70, 78, 85, 72] }
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
