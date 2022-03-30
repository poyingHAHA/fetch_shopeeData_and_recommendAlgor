import mongoose from "mongoose";

// const productItemSchema = new mongoose.Schema({
//   sp_itemid: Number,
//   sp_shopid: Number,
//   name: String,
//   image: String,
// })

const ratingSchema = new mongoose.Schema({
  itemid: Number,
  sp_orderid: Number,
  sp_itemid: Number,
  rating_star: Number,
  comment: String,
  profilePic: String,
},{
  timestamps: true
})