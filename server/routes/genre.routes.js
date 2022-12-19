import express from "express"
import {
  createGenre,
  deleteGenreById,
  deleteGenres,
  getGenreById,
  getGenres,
} from "../controllers/genre.controllers.js"
import { admin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(getGenres)
  .post(protect, admin, createGenre)
  .delete(protect, admin, deleteGenres)
router.route("/:id").get(getGenreById).delete(protect, admin, deleteGenreById)

export default router
