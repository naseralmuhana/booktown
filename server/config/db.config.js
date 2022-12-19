import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {})
    console.log(
      `MongoDB Connected to host`.cyan.bold,
      `${conn.connection.host}`.cyan.bold.underline
    )
  } catch (error) {
    console.error(`Error:`.red.bold, `${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

mongoose.set("strictQuery", false)

export default connectDB
