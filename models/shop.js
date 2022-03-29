import mongoose from "mongoose";

const buyerFollowSchema = new mongoose.Schema({
  buyerid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer'
  },
  profile:{
    type: String
  }
})

const shopFollowSchema = new mongoose.Schema({
  shopid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }
})

const shopSchema = new mongoose.Schema({
  sp_shopid: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    deault: "shop",
  },
  account: {
    type: String,
    require: true
  },
  passeord:{
    type: String,
    require: true
  },
  profilePic:{
    type: String
  },
  selfIntro:{
    type: String
  },
  follower:{
    buyer: [buyerFollowSchema],
    shop: [shopFollowSchema],
    count: 0
  },
  following:{
    buyer: [buyerFollowSchema],
    shop: [shopFollowSchema],
    count: 0
  },
  rating: {
    ratingStar:{
      type: Number
    },
    ratingBad:{
      type: Number
    },
    ratingNormal:{
      type: Number
    },
    ratingGood:{
      type: Number
    }
  }
}, {
  timestamps: true
});
