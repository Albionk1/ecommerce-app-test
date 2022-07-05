const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { Router } = require('express')

const router = Router()


const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'albion secret', {
        expiresIn: maxAge
    })
}


module.exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/')

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}


module.exports.register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const user = await User.create({ name, username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/')

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}