import mongoose from "mongoose";
import {
  labelSchema,
  variationSchema,
  ratingSchema,
  likeSchema,
} from "./partial/partialSchemaForPost.js";

const sharePostSchema = new mongoose.Schema({
  itemid: {
    type: mongoose.Types.ObjectId,
    ref: "ProductPost",
  },
  orderid: {
    type: mongoose.Types.ObjectId,
    ref: "Order"
  },
  buyerid: {
    type: mongoose.Types.ObjectId,
    ref: "Buyer"
  },
  content: {
    type: String
  },
  likes: [likeSchema],
  images: [String],
  responses: [
    {
      userid: {
        type: mongoose.Types.ObjectId
      },
      userPic: {type: String},
      content: {type: String}
    },{
      timestamps: true,
      autoIndex: true
    }
  ]
}, {
  timestamps: true,
  autoIndex: true
});

sharePostSchema.virtual("productdetail", {
  ref: "ProductPost",
  localField: "itemid",
  foreignField: "_id",
});

sharePostSchema.virtual("soldByShareOrder", {
  ref: "Order",
  localField: "_id",
  foreignField: "boughtFromShare"
})

sharePostSchema.virtual("order", {
  ref: "Order",
  localField: "orderid",
  foreignField: "_id"
})

const SharePost = mongoose.model("SharePostSchema", sharePostSchema);
export default SharePost;
