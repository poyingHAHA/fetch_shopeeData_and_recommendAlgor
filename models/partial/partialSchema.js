import mongoose from "mongoose";

const buyerFollowSchema = new mongoose.Schema({
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
  },
  profilePic: {
    type: String,
  },
});

const shopFollowSchema = new mongoose.Schema({
  shopid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
});

const tinderUserSchema = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
  },
  {
    autoIndex: true,
    timestamps: true,
  }
);

const likeItemSchema = new mongoose.Schema(
  {
    name: String,
    itemid: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const tinderItemSchema = new mongoose.Schema(
  {
    itemid: mongoose.Types.ObjectId,
    name: String,
    labels: [{
      labelid: Number,
      display_name: String
    }],
    feLabels: [{
      labelid: Number,
      display_name: String
    }]
  },
  {
    autoIndex: true,
    timestamps: true,
  }
);

export {
  buyerFollowSchema,
  shopFollowSchema,
  tinderUserSchema,
  likeItemSchema,
  tinderItemSchema,
};
