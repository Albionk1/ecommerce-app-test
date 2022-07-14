const porosit = require('../models/porosit')
const ofertat = require('../models/ofertat')
const axios = require('axios')
const User = require('../models/user')
const Room = require('../models/room')



module.exports.login = (req, res) => {
    res.render('login')
}

module.exports.mesagges = (req, res) => {
    axios.get('http://localhost:3000/users')
        .then(function (response) {
            res.render('mesagges', { users: response.data })
        })
}

module.exports.perdoruesit = (req, res) => {

    axios.get('http://localhost:3000/users')
        .then(function (response) {
            res.render('perdoruesit', { users: response.data })
        })
}

module.exports.porosite = (req, res) => {
    if (req.query.page) {
        axios.get('http://localhost:3000/neworder?page=' + req.query.page)
            .then(function (response) {
                res.render('porosite', { porosit: response.data.results, porosiLength: response.data.leng, pageNumber: response.data.page })
            })
    } else {
        axios.get('http://localhost:3000/neworder?page=1')
            .then(function (response) {
                res.render('porosite', { porosit: response.data.results, porosiLength: response.data.leng, pageNumber: response.data.next.page })
            })

    }

}


module.exports.perdiri = (req, res) => {
    res.render('perd-i-ri')
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}
module.exports.dashboard = (req, res) => {

    res.render('index')
}
module.exports.neworderG = (req, res) => {
    porosit.find().then(porosi => {
        var page = parseInt(req.query.page)
        var limit = 2


        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        if (endIndex <= porosi.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        results.leng = porosi.length
        results.page = page


        if (startIndex > 0) {
            results.previus = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = porosi.slice(startIndex, endIndex)




        res.send(results)
    }).catch(err => {
        res.status(500).send({ message: err.mesagge || "error ocurred" })
    })
}

module.exports.ofertat = (req, res) => {
    ofertat.find().then(ofert => { res.send(ofert) }).catch(err => {
        res.status(500).send({ message: err.mesagge || "error ocurred" })
    })
}

module.exports.users = (req, res) => {
    User.find().then(user => { res.send(user) }).catch(err => {
        res.status(500).send({ message: err.mesagge || "error ocurred" })
    })
}

module.exports.room = (req, res) => {
    User.find().then(user => {
        for (i = 0; i < 1; i++) {
            for (a = 0; a < user.length - 1; a++) {
                const emri = user[0].id + "  " + user[a + 1].id
                const room = user[0].id + user[a + 1].id

                //const room = await Room.create({emri,room});
            }
        }
    })
}
module.exports.roomPost = async (req, res) => {
    const userId = req.body.userId
    const otherUserId = req.body.otherUserId
    const user = await User.findById(userId)
    const otheruser = await User.findById(otherUserId)
    const roomName = userId + otherUserId
    const roomNameTwo = otherUserId + userId
    const roomExist = await Room.findOne({ room: roomName })
    const roomExistTwo = await Room.findOne({ room: roomNameTwo })

    if (!(roomExist || roomExistTwo)) {
        const emri = user.username + ' ' + otheruser.username
        const room = userId + otherUserId
        await Room.create({ emri, room })
        return res.redirect('/mesagges?username=' + user.username + '&room=' + room)
    } else {
        if (roomExist) {
            return res.redirect('/mesagges?username=' + user.username + '&room=' + roomExist.room)
        } if (roomExistTwo) {
            return res.redirect('/mesagges?username=' + user.username + '&room=' + roomExistTwo.room)
        }
    }


}
