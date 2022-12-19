import express from "express"
import dotenv from "dotenv"
import colors from "colors"

// To be able to use env variables
dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("API IS RUNNING....")
})

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
