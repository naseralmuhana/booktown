import express from "express"
import {
  createBook,
  deleteBookById,
  deleteBooks,
  getBookById,
  getBooks,
} from "../controllers/book.controllers.js"
import { admin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(getBooks)
  .post(protect, admin, createBook)
  .delete(protect, admin, deleteBooks)

router.route("/:id").get(getBookById).delete(protect, admin, deleteBookById)

export default router
