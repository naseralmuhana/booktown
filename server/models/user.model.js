import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      validate: {
        validator: (value) =>
          validator.isAlphanumeric(validator.blacklist(value, " -.")),
        message: "Please use only letters, numbers and periods",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "Please enter an password"],
      minLength: [6, "Minimum password length is 6 characters"],
      trim: true,
    },
    image: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
)
// Methods
userSchema.method({
  matchPassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  },
})

// Statics
userSchema.static({
  findOneByEmail: function (email) {
    if (email) return this.findOne({ email: new RegExp(email, "i") })
    return
  },
})

userSchema.query.defaultSelect = function () {
  return this.select("_id name email image")
}

// Hash password pre save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User
