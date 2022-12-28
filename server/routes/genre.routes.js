import express from "express"
import {
  createGenre,
  deleteGenreById,
  getGenreById,
  getGenres,
  updateGenreById,
} from "../controllers/genre.controllers.js"
import { admin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(getGenres).post(createGenre) // protect, admin,

router
  .route("/:id")
  .get(getGenreById)
  .put(updateGenreById)
  .delete(deleteGenreById) // protect, admin,

export default router
