import mongoose from 'mongoose'

const dbName = 'tinderAppDB'
const connectionURL = 'mongodb://127.0.0.1:27017/'+dbName

mongoose.connect(connectionURL).then(()=>{
  console.log("connect to database")
}).catch((e)=>{
  console.log(e)
})