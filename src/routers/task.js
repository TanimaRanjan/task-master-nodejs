const express = require('express')
const router = new express.Router()

const Task = require('../models/task')
const User = require('../models/user')

const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req,res) => {
    
    // const task = new Task(req.body) 
    const task = new Task({
        ...req.body, user_id:req.user._id
    })

    try {

        await task.save()
        res.status(201).send(task)

    } catch (error) {
        res.status(400).send(error)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// router.get('/tasks', auth, async (req,res) => {

//     try {
//         const tasks = await Task.find({user_id:req.user._id})
        
//         // This can be used too with #1
//         // await req.user.populate('tasks').execPopulate()

//         // const task = await Task.findById('5d02448aa3b0228159d52d8f')
//         // await task.populate('user_id').execPopulate()
//         // console.log(task.user_id)

//         // const user = await User.findById('5d0243a693486d80f0ace9bd')
//         // await user.populate('tasks').execPopulate()
//         // console.log(user.tasks)

//         res.send(tasks)
//           // This can be used --  #1
//         // res.send(req.user.tasks)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }
//     // Task.find({}).then((tasks) => {
//     //     res.send(tasks)
//     // }).catch((error) => {
//     //     res.status(500).send(error)
//     // })
// })



// GET /tasks?completed=true  -- to get completed or not completed tasks
// GET /tasks?limit=10&skip=10 
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req,res) => {

    const match = {}
    const sort = {}

    if(req.query.completed) {
        // match.completed = req.query.completed === 'true'
        //this works too
        match.completed = req.query.completed
    }

    
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        console.log(parts)
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        console.log(sort)
    }

    try {
        // const tasks = await Task.find({user_id:req.user._id})

        await req.user.populate({
            path:'tasks',
            match,
            // match: {
            //     completed:req.query.completed
            // }
            options: {
                limit:parseInt(req.query.limit),
                // Below works too. Parsing is done
                //limit:req.query.limit
                skip:parseInt(req.query.skip),
                // sort: {
                //     createdAt:-1
                // }
                sort
            }
        }).execPopulate()

        res.send(req.user.tasks)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})


router.get('/tasks/:id', auth,  async (req,res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, user_id:req.user._id})
        if(!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    } 

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send('Task not found')
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id:req.params.id, user_id:req.user._id})

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, 
        //     {new:true, runValidators:true})

        if(!task) {
            return res.status(404).send('Task not found')
        }
        updates.forEach((update) => task[update] =  req.body[update] )
        await task.save()
        res.send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id) 
        const task = await Task.findOneAndDelete({_id:req.params.id, user_id: req.user._id})
        console.log(task)
        if(!task) {
            return res.status(404).send('Task not found')
        } 
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router