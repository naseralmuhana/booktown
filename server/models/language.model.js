import mongoose from "mongoose"
import validator from "validator"

const languageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a language"],
      unique: true,
      trim: true,
      validate: {
        validator: (value) =>
          validator.isAlphanumeric(validator.blacklist(value, " -.")),
        message: "Please use only letters, numbers and periods",
      },
    },
    image: String,
    description: { type: String, trim: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      autopopulate: { select: "name slug" },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      autopopulate: { select: "name slug" },
    },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
)

// Methods
languageSchema.method({
  matchByName: function (name) {
    return this.name.toLowerCase() === name.toLowerCase().trim()
  },
  // matchByDescription: function (description) {
  //   return this.description.toLowerCase() === description.toLowerCase().trim()
  // },
  matchByImage: function (image) {
    return this.image.toLowerCase() === image.toLowerCase().trim()
  },
})

// Statics
languageSchema.static({
  findByName: function (name) {
    return this.find({ name: new RegExp(name, "i") })
  },
})

// convert name felid into capitalized name
languageSchema.pre("validate", function (next) {
  if (this.name)
    this.name =
      this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
  next()
})

const Language = mongoose.model("Language", languageSchema)

export default Language
