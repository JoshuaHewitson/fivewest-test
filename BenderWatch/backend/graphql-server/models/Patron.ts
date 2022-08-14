import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  drinks: [{ drinkId: String, time: String, millilitersAlcohol: Number }]
})

export const Patron = mongoose.model('Patron', patronSchema)
