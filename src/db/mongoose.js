const mongoose = require('mongoose')
// const validator = require('validator')

const url = 'mongodb://127.0.0.1:27017/task-master-api'

// const id  = new ObjectID()
// console.log(id)

mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    userFindAndModify:false
} )



//  const me = new User({
//      name:'   Andrew  ',
//      email: 'ANDREWEMAIL@Gmail.com', 
//      password:'apple12345'
//  })

//  me.save().then(() => {
//     console.log(me)
//  }).catch((error) => {
//     console.log(error.message)
//  })



//  const task = new Tasks({
//      description: '      Find an image for website     '
    
//  })

//  task.save().then(() => {
//      console.log(task)
//  }).catch((error) => {
//      console.log(error)
//  })