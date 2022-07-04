const User = require('../models/user')
const jwt =require('jsonwebtoken')
const {Router} = require('express')

const router = Router()


const maxAge = 3 * 24 * 60 * 60
const createToken = (id)=>{
    return jwt.sign({id},'albion secret',{
        expiresIn: maxAge})}


module.exports.signin = async (req,res) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token =  await createToken(user._id)
    if(user.user){
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
        res.redirect('/')
    }  
    else{
        res.render('login')
    }
}


module.exports.register = async (req,res) => {
    const user = new User(req.body)
    const token =  await createToken(user._id)
    console.log(req.body)
    try {
        await user.save()
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
        if(user){
            res.redirect('/')
        }
    } catch (e) {
        res.status(400).send(e)
    }
    }