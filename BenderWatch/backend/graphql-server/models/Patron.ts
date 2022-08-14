import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  drinkIds: [String]
})

export const Patron = mongoose.model('Patron', patronSchema)
