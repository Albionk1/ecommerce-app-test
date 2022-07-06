const mongoose = require('mongoose')

const porositSchema = new mongoose.Schema({
   emriPorosis: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a name')
         }
      }
   },
   pershkrimi: {
      type: String,

   },
   qmimi: {
      type: Number,
      required: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a price')
         }
      }
   },
   name: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a name')
         }
      }
   },
   adresa: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a address')
         }
      }
   },
   phone: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a phone number')
         }
      }
   },
   Ofertat: {
      type: String,
      required: true,
      validate(value) {
         if (!value) {
            throw new Error('Please pick an offert')
         }
      }
   }
})
const Porosit = mongoose.model('Porosit', porositSchema)

module.exports = Porosit