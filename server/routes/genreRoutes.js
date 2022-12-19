import express from "express"
import {
  createGenre,
  deleteGenreById,
  deleteGenres,
  getGenres,
} from "../controllers/genreControllers.js"

const router = express.Router()

router.route("/").get(getGenres).post(createGenre).delete(deleteGenres)
router.route("/:id").delete(deleteGenreById)

export default router
