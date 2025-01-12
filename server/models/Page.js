import { Schema, model } from "mongoose";

const pageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pageNb: {
      type: Number,
      required: true,
      unique: true,
    },
    asset: {
      asset_type: {
        type: String,
        required: true,
        enum: ["image", "video"],
      },
      url: {
        type: String,
        required: true,
      },
    },
    p: {
      type: String,
      required: true,
    },
    h1: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Page = model("Page", pageSchema);
export default Page;
