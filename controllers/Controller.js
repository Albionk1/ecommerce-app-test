const User = require('../models/user')

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
    res.render('porosite')
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
