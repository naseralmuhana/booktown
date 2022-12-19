import express from "express"
import languageRoutes from "./language.routes.js"
import authorRoutes from "./author.routes.js"
import genreRoutes from "./genre.routes.js"

const router = express.Router()

// Routes
router.use("/api/languages", languageRoutes)
router.use("/api/authors", authorRoutes)
router.use("/api/genres", genreRoutes)

export default router
