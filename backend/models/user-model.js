import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
}, { timestamps: true })
//used to add createdAt and updatedAt
// Whenever a new document is created, createdAt is set to the current date and time. Whenever the document is updated, updatedAt is refreshed to reflect the time of the update.

export default mongoose.model("User", userSchema)
