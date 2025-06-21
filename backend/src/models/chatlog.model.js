import mongoose, { Schema } from "mongoose";

const chatlogSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  response: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const ChatLog = mongoose.model("ChatLog", chatlogSchema);