import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

export const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // add min & max
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
)
