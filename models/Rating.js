import mongoose from "mongoose";

// const productItemSchema = new mongoose.Schema({
//   sp_itemid: Number,
//   sp_shopid: Number,
//   name: String,
//   image: String,
// })

const ratingSchema = new mongoose.Schema(
  {
    itemid: mongoose.Types.ObjectId,
    shopid: mongoose.Types.ObjectId,
    sp_itemid: Number,
    sp_shopid: Number,
    ratings:[{
      itemid: mongoose.Types.ObjectId,
      shopid: mongoose.Types.ObjectId,
      orderid: mongoose.Types.ObjectId,
      sp_shopid: Number,
      sp_itemid: Number,
      sp_orderid: Number,
      sp_buyerid: Number,
      rating_star: Number,
      comment: String,
      buyerPic: String,
      ctime: Number,
      buyerPic: String,
      images:[String],
      _id: false,
    },{
      timestamps: true
    }]  
  },{
  timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema)
export default Rating