import mongoose from "mongoose"
import { tinderUserSchema } from "./partial/partialSchema"

const labelSchema = new mongoose.Schema({
  labelid:{
    type: Number
  },
  display_name:{
    type: String
  }
})

const variationSchema = new mongoose.Schema({
  name: String,
  options: [
    {
      type: String
    }
  ],
  images: String
})

const ratingSchema = new mongoose.Schema({
  rating_star: Number,
  rating_count: [Number]
})

const likeSchema = new mongoose.Schema({
  userid: mongoose.Types.ObjectId
},{
  timestamps: true,
  autoIndex: true
})

const shareSchema = new mongoose.Schema({
  userid: mongoose.Types.ObjectId,
  postid: mongoose.Types.ObjectId
})

const productPostSchema = new mongoose.Schema(
  {
    sp_itemid:{
      type: Number
    },
    sp_shopid:{
      type: Number
    },
    name: {
      type: String,
      required: true
    },
    content:{
      type: String
    },
    labels: [labelSchema],
    feLabels: [labelSchema],
    shipping_free: {
      type: Boolean,
      default: false
    },
    variation: [variationSchema],
    images:[String],
    display:{
      type: Boolean
    },
    price: Number,
    priceMax: Number,
    priceMin: Number,
    rating: ratingSchema,
    likes: [likeSchema],
    discount: Number,
    historicalSold: Number,
    monthSold: Number,
    stock: Number,
    shared: [shareSchema],
    tinderLike: tinderUserSchema,
    tinderDislike: tinderUserSchema,
  },{
    timestamps: true
  }
)

productPostSchema.virtual("ratings",{
  ref: 'Rating',
  localField: '_id',
  foreignField: 'itemid'
})