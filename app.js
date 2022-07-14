const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const authRoutes = require('./middleware/authmiddleware')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, getRoomUsers } = require('./utils/users')



const app = express()
const server = http.createServer(app)
const io = socketio(server)


io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    io.to(user.room).emit('roomUsers',

      users = getRoomUsers(user.room)
    )

  })

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // socket.on('disconnect', () => {
  //   io.emit('message', 'a user has left the chat')
  // })

})
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
server.listen(3000)
// routes
app.use(Routes)
app.use(authRoutes)