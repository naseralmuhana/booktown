import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const languageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a language"],
      unique: true,
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
)

const Language = mongoose.model("Language", languageSchema)

export default Language
