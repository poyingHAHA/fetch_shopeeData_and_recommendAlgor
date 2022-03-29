import mongoose from "mongoose"

const labelSchema = new mongoose.Schema({
  labelid:{
    type: Number
  },
  display_name:{
    type: String
  }
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
    feLabels: [labelSchema]
  }
)