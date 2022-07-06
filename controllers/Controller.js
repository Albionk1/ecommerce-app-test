const porosit = require('../models/porosit')
const axios = require('axios')


module.exports.login = (req, res) => {
    res.render('login')
}

module.exports.mesagges = (req, res) => {

    res.render('mesagges')
}

module.exports.perdoruesit = (req, res) => {
    res.render('perdoruesit')
}

module.exports.porosite = (req, res) => {
    axios.get('http://localhost:3000/neworder')
        .then(function (response) {
            res.render('porosite', { porosit: response.data })
        })

}
module.exports.porositereja = (req, res) => {
    res.render('porositereja')
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
    porosit.find().then(porosi => { res.send(porosi) }).catch(err => {
        res.status(500).send({ message: err.mesagge || "error ocurred" })
    })
}
