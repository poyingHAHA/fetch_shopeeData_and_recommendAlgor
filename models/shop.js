import mongoose from "mongoose";
import {
  buyerFollowSchema,
  shopFollowSchema,
} from "./partial/partialSchema.js";


const shopSchema = new mongoose.Schema(
  {
    sp_shopid: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      deault: "shop",
    },
    name:{
      type: String
    },
    itemcount: Number,
    account: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
    },
    selfIntro: {
      type: String,
    },
    follower: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: 0,
    },
    following: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: 0,
    },
    rating: {
      ratingStar: {
        type: Number,
      },
      ratingBad: {
        type: Number,
      },
      ratingNormal: {
        type: Number,
      },
      ratingGood: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
