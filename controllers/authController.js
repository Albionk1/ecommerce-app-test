const User = require('../models/user')
module.exports.signin = async (req,res) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    res.send({user})
     


}

module.exports.register = async (req,res) => {
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
        res.status(201).send({user})
    } catch (e) {
        res.status(400).send(e)
    }
    }