import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db.js"

import languageRoutes from "./routes/languageRoutes.js"
import authorRoutes from "./routes/authorRoutes.js"

// To be able to use env variables
dotenv.config()

// Connect to Database
connectDB()

const app = express()

// allow us to accept json data (like: body from POST request)
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API IS RUNNING....")
})

// Routes
app.use("/api/languages", languageRoutes)
app.use("/api/authors", authorRoutes)

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
