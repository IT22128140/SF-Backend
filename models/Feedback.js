import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phoneNumber: {
    type: String,
    required: true
  },
  feedback: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true 
  }
});

export const Feedback = mongoose.model('Feedback', FeedbackSchema);