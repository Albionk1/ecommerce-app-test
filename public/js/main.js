const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.second-body-up')


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io()

socket.emit('joinRoom', { username, room })

//get Room users

socket.on('roomUsers', (users) => {

    return users.username
})




// message from server
socket.on('message', message => {

    outputMessage(message, username)

    //scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)
    //clear inputs
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

//Output message to Dom
function outputMessage(message, username) {
    const div = document.createElement('div')
    div.classList.add('second-body-r')

    if (username === message.username) {
        div.innerHTML = `<div class="second-body-lr 1">
   <div class="second-body-l-2">
       <small>${message.time}</small>
       <a href="#">
           <h3>${message.username}</h3>
       </a>
   </div>
   <div class="profile-photo">
       <img src="./assets/images/profile-1.jpg" alt="">
   </div>

</div>
<div class="second-card">
   <p>${message.text}</p>
</div>`;
    }
    else {
        div.innerHTML = `<div class="second-body-l">
  <div class="second-body-lr">
      <div class="profile-photo">
          <img src="./assets/images/profile-2.jpg" alt="">
      </div>
      <div class="second-body-l-2">
          <a href="#">
              <h3>${message.username}</h3>
          </a>
          <small>${message.time}</small>
      </div>
  </div>
  <div class="second-card">
      <p>${message.text}</p>
  </div>
</div>`
    }
    document.querySelector('.second-body-up').appendChild(div)
}
