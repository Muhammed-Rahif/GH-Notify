import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    personalAccessToken: { type: String, required: true, unique: true },
    lastReceivedOn: { type: Date, required: true },
    joined: { type: Date, default: Date.now(), required: true },
    userId: { type: Number, required: true, unique: true },
});

export default mongoose.model("User", userSchema, "users");
