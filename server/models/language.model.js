import mongoose from "mongoose"
import common from "../constants/common.js"

const languageSchema = mongoose.Schema(
  {
    name: common.modelNameSettings,
    slug: common.modelSlugSettings,
  },
  { timestamps: true }
)

// capitalized NAME field pre SAVE
languageSchema.pre("save", function (next) {
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
  next()
})

// Methods
languageSchema.method({
  matchByName: function (name) {
    return this.name.toLowerCase() === name.toLowerCase().trim()
  },
})

const Language = mongoose.model("Language", languageSchema)

export default Language
