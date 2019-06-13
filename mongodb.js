const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'

const dbName = 'task-master'

// const id  = new ObjectID()
// console.log(id)

MongoClient.connect(url, { useNewUrlParser : true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to DB')
    } 
    console.log('Connected ')
    const db = client.db(dbName)

    // db.collection('users').findOne({
    //     name : 'Antonio'
    // }, (error, results) => {
    //     if(error) {
    //         return console.log('Unable to get data')
    //     }
    //     console.log(results)
    // })

    // db.collection('users').insertOne({
    //     _id: id,
    //     name:'Kenneth',
    //     age: 49
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user ')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Allison',
    //         age:34
    //     }, 
    //     { 
    //         name: 'Marcus',
    //         age:38
    //     }
    //     ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert users')
    //     }
    //     console.log(result.ops)

    // })

    // client.close()

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Learn Mongo DB',
    //         completed : false
    //     },
    //     {
    //         description: 'Learn JS',
    //         completed : true
    //     },
    //     {
    //         description: 'Learn Node JS',
    //         completed : false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks')
    //     } 
    //     console.log(result.ops)
    // })

    // db.collection('tasks').find({}).toArray((error, items) => {
    //     if(error) {
    //         return console.log('Unable to get data from tasks')
    //     }

    //     console.log(items)
    // })

    // Update 
    // db.collection('users').update(
    //     {age:35}, 
    //     { $inc: { age:1 }
    //     }, 
    //     ).then((data) => {
    //         console.log(data)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    db.collection('tasks').updateMany({
        completed:true
    }, { $set : { completed : false
    }}).then((data) => {
        console.log("Updated "+data.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').updateMany({
        name:'A2'
    }, { $set : { 
        name:'Antonio',
        age:42
    }}).then((data) => {
        console.log("Updated "+data.modifiedCount)
    }).catch((error) => {
        console.log(error)
    }) 

    db.collection('users').deleteOne({
        _id: new ObjectID("5cffc1ecf9877d2b58ef1d90")
    }
    ).then((data) => {
        console.log(data.deletedCount)
    } ).catch((error) => {
        console.log(error)
    })
})


