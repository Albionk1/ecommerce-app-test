const User = require('../models/user')
const Porosit = require('../models/porosit')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const multer = require('multer')
const sharp = require('sharp')





const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'albion secret', {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email or password is icorrect';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
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
module.exports.neworder = async (req, res) => {
    const { emriPorosis, pershkrimi, qmimi, name, adresa, phone, Ofertat } = req.body;


    const porosit = await Porosit.create({ emriPorosis, pershkrimi, qmimi, name, adresa, phone, Ofertat });
    res.redirect('/porositereja')



}
module.exports.porositereja = (req, res) => {

    axios.get('http://localhost:3000/ofertat')
        .then(function (response) {
            res.render('porositereja', { oferta: response.data })
        })
}


module.exports.addPhoto = async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer()
    const user = await User.findById(req.query.id, { image: buffer })
    console.log(user)
    await user.save()
}
module.exports.image = async (req, res) => {

    try {
        const user = await User.findById(req.query.id)

        if (!user || !user.image) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.image)
    } catch (e) {
        res.status(404).send()
    }
}


