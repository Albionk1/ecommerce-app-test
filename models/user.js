const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!value){
                throw new Error('Please insert a name')
            }
        }
    },
    username:{
       type:String,
       required:true,
       trim:true,
       unique:true,
       validate(value){
        if(!value){
            throw new Error('Please insert a valide username')
        }
    }},
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:[6,'Password must contain 6 characters'],
        trim: true,
        
    }
    
})

userSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({ email })
    if (!user) {
        return {error: "Email or password is wrong!"};
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return {error: "Email or password is wrong!"};
    }

    return {user}
}
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User