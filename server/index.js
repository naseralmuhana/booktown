import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import path from "path"
import morgan from "morgan"
import connectDB from "./config/db.config.js"

import { errorHandler, notFound } from "./middleware/error.middleware.js"
import routes from "./routes/index.js"

// To be able to use env variables
dotenv.config()

// Connect to Database
connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("API IS Still RUNNING....")
})

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// for parsing application/json
app.use(express.json())

// registering routes
app.use(routes)

// Make uploads folder static to get the ability to access it
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Error Middleware (page not found - errors)
app.use(notFound)
app.use(errorHandler)

// App Listen
const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV || "development"
app.listen(
  PORT,
  console.log(
    `Server running in`.yellow.bold,
    `${MODE}`.yellow.bold.underline,
    `mode on`.yellow.bold,
    `http://localhost:${PORT}`.yellow.bold.underline
  )
)
