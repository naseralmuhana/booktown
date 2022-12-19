import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const genreSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // set required:true
    description: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
)

const Genre = mongoose.model("Genre", genreSchema)

export default Genre
