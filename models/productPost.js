import mongoose from "mongoose";
import { tinderUserSchema } from "./partial/partialSchema.js";
import {
  labelSchema,
  variationSchema,
  ratingSchema,
  likeSchema,
} from "./partial/partialSchemaForPost.js";

const shareSchema = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    postid: mongoose.Types.ObjectId,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    autoIndex: true,
  }
);

const productPostSchema = new mongoose.Schema(
  {
    shopid: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    sp_itemid: {
      type: Number,
    },
    sp_shopid: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    labels: [labelSchema],
    feLabels: [labelSchema],
    shipping_free: {
      type: Boolean,
      default: false,
    },
    variation: [variationSchema],
    models: [
      {
        name: String,
        price: Number,
        stock: Number,
        modelid: Number,
        _id: false,
      },
    ],
    images: [String],
    display: {
      type: Boolean,
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
  },
  {
    timestamps: true
  }
);

productPostSchema.virtual("ratingDetail", {
  ref: "Rating",
  localField: "_id",
  foreignField: "itemid",
});

productPostSchema.virtual("sharePosts", {
  ref: "SharePost",
  localField: "_id",
  foreignField: "itemid",
});

const ProductPost = mongoose.model("ProductPost", productPostSchema);
export default ProductPost;