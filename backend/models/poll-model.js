import mongoose from 'mongoose'

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: { type: String, required: true }, //storing text for option
      votes: { type: Number, default: 0 },    
    },
  ],
  votedUsers: [
    {
      type: String, // storing email here
    }
  ]
})

export default mongoose.model('Poll', pollSchema)
