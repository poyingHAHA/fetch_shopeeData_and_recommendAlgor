import mongoose from "mongoose";
import {
  buyerFollowSchema,
  shopFollowSchema,
  likeItemSchema,
  tinderItemSchema,
} from "./partial/partialSchema.js";

const buyerSchema = new mongoose.Schema(
  {
    role: "buyer",
    awardcoin: Number,
    account: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
    },
    selfIntro: {
      type: String,
    },
    likes: [likeItemSchema],
    follower: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: {
        type: Number,
        set: ()=>this.buyer.length+this.shop.length
      },
    },
    following: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: {
        type: Number,
        set: ()=>this.buyer.length+this.shop.length
      },
    },
    tinderLike: [tinderItemSchema],
    tinderDislike: [tinderItemSchema],
  },
  {
    timestamps: true,
  }
);

buyerSchema.virtual("sharePosts", {
  ref: "SharePost",
  localField: "_id",
  foreignField: "buyerid",
});

const Buyer = mongoose.model('Buyer', buyerSchema)
export default Buyer