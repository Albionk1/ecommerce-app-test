const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const authRoutes = require('./middleware/authmiddleware')

const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'))

// database connection
mongoose.connect('mongodb+srv://albion:123albion@cluster0.q2e9fc8.mongodb.net/ecommerce-app', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})
app.listen(3000)
// routes
app.use(Routes)
app.use(authRoutes)