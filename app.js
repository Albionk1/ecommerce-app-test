const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Routes = require('./routes/routes')


const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/public'))

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})
app.listen(3000)

// routes

app.get('/', (req, res) => res.render('index'))

app.use(Routes)