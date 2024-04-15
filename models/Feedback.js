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
  feedback: { 
    type: String, 
    required: true 
},
  rating: { 
    type: Number, 
    required: true 
},
  image: { 
    type: String 
} 
});

export const Feedback = mongoose.model('Feedback', FeedbackSchema);
