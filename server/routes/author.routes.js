import express from "express"
import {
  createAuthor,
  deleteAuthorById,
  deleteAuthors,
  getAuthorById,
  getAuthors,
} from "../controllers/author.controllers.js"
import { admin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(getAuthors)
  .post(protect, admin, createAuthor)
  .delete(protect, admin, deleteAuthors)

router.route("/:id").get(getAuthorById).delete(protect, admin, deleteAuthorById)

export default router
