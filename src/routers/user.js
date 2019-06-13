const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router() 
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({user, token})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        }) 
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
       
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch(error) {
    //     res.status(500).send(error)
    // }
})

// router.get('/users/:id', async (req, res) => {

//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send('User not found')
//         }
//         res.send(user)
//     } catch(error) {
//         res.status(500).send(error)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )
    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates '})
    }

    try {
        // const user = await User.findById(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, 
                // {new : true, runValidators:true})
        // if(!user) {
        //     return res.status(404),send('User not found')
        // }
        res.send(req.user)
    } catch(error) {
        res.status(400).send(error)
    } 
    
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user) {
        //     return res.status(404).send()
        
        // }
        console.log('deleting')
        console.log(req.user)
        await req.user.remove()
        res.send(req.user)

    } catch (error) {
        res.status(500).send(error)
    }
   
})

module.exports = router