import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const languageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a language"],
      unique: true,
      trim: true,
    },
    description: { type: String, trim: true }, // set required:true
    slug: { type: String, slug: "name" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
)

languageSchema.pre("save", function (next) {
  // capitalize
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
  next()
})

// static
languageSchema.static({
  // find with populate createdBy, updatedBy
  findWithPopulate: function (params) {
    return this.find(params)
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
  },
  // find by id with populate createdBy, updatedBy
  findByIdWithPopulate: function (id) {
    return this.findById(id)
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
  },
  // find By Name with populate createdBy, updatedBy
  findByNameWithPopulate: function (name) {
    return this.find({ name: new RegExp(name, "i") })
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
  },
})

const Language = mongoose.model("Language", languageSchema)

export default Language
