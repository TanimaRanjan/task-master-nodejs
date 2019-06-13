const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
       type:String, 
       trim:true,
       required:true
    }, 
    age: {
       type:Number, 
       default:0,
       validate(val) {
           if(val<0) {
               throw new Error('Less than zero')
           }
       }
    }, 
    email : {
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        validate(val) {
           if(!validator.isEmail(val)) {
               throw new Error('Please enter a valid email ')
           }
        }
    }, 
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(val) {
            if(val.toLowerCase().includes('password')) {
               throw new Error('Password cannot contain word password ')
            }
        }
    }, 
    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user.id.toString()}, 'nodejsapplication')
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// userSchema.methods.getPublicProfile =  function () {
userSchema.methods.toJSON =  function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    } 
    const isMatch = await bcryptjs.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// Hash the plain text password before saving 
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports =  User