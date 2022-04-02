import mongoose from "mongoose";

const labelSchema = new mongoose.Schema(
  {
    labelid: {
      type: Number,
    },
    display_name: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const variationSchema = new mongoose.Schema(
  {
    name: String,
    options: [
      {
        type: String,
      },
    ],
    images: [String],
  },
  {
    _id: false,
  }
);

const ratingSchema = new mongoose.Schema(
  {
    rating_star: Number,
    rating_count: [Number],
  },
  {
    _id: false,
  }
);

const likeSchema = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    userPic: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    autoIndex: true,
    _id: false,
  }
);

export { labelSchema, variationSchema, ratingSchema, likeSchema };
