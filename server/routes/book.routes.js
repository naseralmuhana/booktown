import express from "express"
import {
  createBook,
  createBookReview,
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
  .post(protect, createBook) //protect, admin,
  .delete(protect, admin, deleteBooks)

router.route("/:id").get(getBookById).delete(protect, admin, deleteBookById)
router.route("/:id/reviews").post(protect, createBookReview)

export default router
