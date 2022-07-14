const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
   emri: {
      type: String,
      required: true,
   },
   room: {
      type: String,
      require: true
   }

}
)
const room = mongoose.model('Room', roomSchema)

module.exports = room