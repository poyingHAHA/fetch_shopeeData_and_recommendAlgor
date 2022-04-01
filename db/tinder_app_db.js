import mongoose from 'mongoose'

const dbName = 'tinder-like-test'
const connectionURL = 'mongodb://127.0.0.1:27017/'+dbName

mongoose.connect(connectionURL).then(()=>{
  console.log("connect to database")
}).catch((e)=>{
  console.log(e)
})