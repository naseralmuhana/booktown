import express from "express"
import languageRoutes from "./language.routes.js"
import authorRoutes from "./author.routes.js"
import genreRoutes from "./genre.routes.js"
import userRoutes from "./user.routes.js"
import bookRoutes from "./book.routes.js"
import uploadRoutes from "./upload.routes.js"

const router = express.Router()

// Routes
router.use("/api/languages", languageRoutes)
router.use("/api/authors", authorRoutes)
router.use("/api/genres", genreRoutes)
router.use("/api/users", userRoutes)
router.use("/api/books", bookRoutes)
router.use("api/upload", uploadRoutes)

export default router
