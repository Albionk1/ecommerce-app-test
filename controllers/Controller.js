const porosit = require('../models/porosit')
const ofertat = require('../models/ofertat')
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
    if (req.query.page) {
        axios.get('http://localhost:3000/neworder?page=' + req.query.page)
            .then(function (response) {
                res.render('porosite', { porosit: response.data.results, porosiLength: response.data.leng, pageNumber: response.data.next.page - 1 })
            })
    } else {
        axios.get('http://localhost:3000/neworder?page=1')
            .then(function (response) {
                res.render('porosite', { porosit: response.data.results, porosiLength: response.data.leng, pageNumber: response.data.next.page - 1 })
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
