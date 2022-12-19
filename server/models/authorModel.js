import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // set required:true
    description: { type: String }, // set required:true
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
)

const Author = mongoose.model("Author", authorSchema)

export default Author
