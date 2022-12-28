import mongoose from "mongoose"
import common from "../constants/common.js"
import Book from "./book.model.js"
import path from "path"
import { removeUploadedFile } from "../utils/fileUpload.utils.js"
import validateHandler from "../middleware/validate.middleware.js"

const __dirname = path.resolve()

const genreSchema = mongoose.Schema(
  {
    name: common.modelNameSettings,
    image: String,
    slug: common.modelSlugSettings,
  },
  { timestamps: true }
)

genreSchema.pre("save", function (next) {
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
  next()
})
genreSchema.pre("remove", function (next) {
  Book.find({ genre: this._id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books?.length > 0) {
      next(new Error("Can 't remove This genre, used by books"))
    } else {
      next()
    }
  })
})
genreSchema.post("remove", function () {
  if (this?.image) removeUploadedFile(__dirname, this?.image)
})

// genreSchema.pre("findUpdateById", function (doc) {
//   if (doc?.image) removeUploadedFile(__dirname, doc?.image)
// })

// Methods
genreSchema.method({
  matchByName: function (name) {
    return this.name.toLowerCase() === name.toLowerCase().trim()
  },
  deleteExistImage: function () {
    if (this?.image) removeUploadedFile(__dirname, this?.image)
  },
})

genreSchema.static({
  findUpdateById: async function (body) {
    const { id, name, image } = body
    const genre = await this.findById(id)
    if (genre) {
      try {
        if (!genre.matchByName(name)) {
          genre.name = name
          await genre.save()
        }
        // if (image) {
        //   if (genre.image) removeUploadedFile(__dirname, genre?.image)
        //   genre.image = image
        //   await genre.save()
        // }
        return genre
      } catch (error) {
        return validateHandler(error)
      }
    }
    throw new Error("Genre not found")
  },
})

const Genre = mongoose.model("Genre", genreSchema)

export default Genre
