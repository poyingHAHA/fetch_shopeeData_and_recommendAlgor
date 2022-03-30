import mongoose from "mongoose";
import {
  buyerFollowSchema,
  shopFollowSchema,
  likeItemSchema,
  tinderItemSchema,
} from "./partial/partialSchema";

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
      count: 0,
    },
    following: {
      buyer: [buyerFollowSchema],
      shop: [shopFollowSchema],
      count: 0,
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
