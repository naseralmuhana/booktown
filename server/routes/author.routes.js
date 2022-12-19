import express from "express"
import {
  createAuthor,
  deleteAuthorById,
  deleteAuthors,
  getAuthors,
} from "../controllers/author.controllers.js"

const router = express.Router()

router.route("/").get(getAuthors).post(createAuthor).delete(deleteAuthors)
router.route("/:id").delete(deleteAuthorById)

export default router
