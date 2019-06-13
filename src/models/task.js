const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description: {
       type:String, 
       trim:true,
       required :true
    }, 
    completed : {
       type:Boolean,
       default:false
    }
})


const Tasks = mongoose.model('Tasks',  taskSchema)

module.exports = Tasks