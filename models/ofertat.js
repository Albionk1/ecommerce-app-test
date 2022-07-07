const mongoose = require('mongoose')

const ofertSchema = new mongoose.Schema({
   emri: {
      type: String,
      required: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a name for the ofert')
         }
      }
   },
   qmimi: {
      type: Number,
      require: true,
      validate(value) {
         if (!value) {
            throw new Error('Please insert a price')
         }
      }

   }

}
)
const Ofertat = mongoose.model('Ofertat', ofertSchema)

module.exports = Ofertat