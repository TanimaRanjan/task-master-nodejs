require('./db/mongoose')

const User = require('./models/user')

// User.findOneAndUpdate('5cffedd66af38838c0388961', {age:1})
// .then((user) => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

// const updateAgeAndCount = async (id, age ) => {
//     const user = await User.findByIdAndUpdate(id, {age})
//     const count = await User.countDocuments({age})
//     return {user, count}
// }

// updateAgeAndCount('5cffedd66af38838c0388961', 0).then((user) => {
//     console.log(user)
// }).catch((error) => {
//     console.log(error)
// })

const Task = require('./models/task')

// Task.findByIdAndDelete('5d0017ceef464d4322200e4a')
//     .then((task) => {
//         console.log(task)
//         return Task.find({ completed:false })
//     }).then((tasks) => {
//         console.log(tasks)
//     }).catch(() => {
//         console.log(error)
//     })

const findTaskByID = async (id) => {
    const task = await Task.findByIdAndUpdate(id, {description:"Find a good image for the website"})
    const count = await Task.countDocuments({completed:false})
    return count
} 

findTaskByID('5cffee35e74dfa38e783eb3f').then((task1)=> {
    console.log('Not sure whats happening '+task1)
}).catch((error) => {
    console.log(error)
})

