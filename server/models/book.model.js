import mongoose from "mongoose"
import slug from "mongoose-slug-generator"
import { reviewSchema } from "./review.model.js"

mongoose.plugin(slug)

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Genre",
    },
    image: { type: String }, // set required:true
    description: { type: String }, // set required:true
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 }, // add min & max
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
)

bookSchema.pre("save", function (next) {
  if (!this.isModified("rating")) {
    next()
  }
  const updatedRating = this.rating.toFixed(2)
  this.rating = parseFloat(updatedRating)
  next()
})

const Book = mongoose.model("Book", bookSchema)

export default Book

// Publication_date = models.DateField(default='2020-12-31')
// page = models.IntegerField('Pages number', default=100)
// for_age = models.IntegerField('For ages', default=15)
// discount_price = models.FloatField(blank=True, null=True)
// authors = models.ManyToManyField(to='Author')
// language = models.ForeignKey(to='Language', on_delete=models.DO_NOTHING)
// categories = models.ManyToManyField(to='Category')
// year = models.ForeignKey(to='Year', on_delete=models.DO_NOTHING)
// favourite = models.ManyToManyField(
//     User, related_name='favourite', blank=True)
// active = models.BooleanField(default=True)
