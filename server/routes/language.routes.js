import express from "express"
import {
  getLanguages,
  createLanguage,
  deleteLanguageById,
  deleteLanguages,
  getLanguageById,
  updateLanguageById,
} from "../controllers/language.controllers.js"
import { admin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(getLanguages)
  .post(protect, admin, createLanguage)
  .delete(protect, admin, deleteLanguages)
router
  .route("/:id")
  .get(getLanguageById)
  .put(protect, admin, updateLanguageById)
  .delete(protect, admin, deleteLanguageById)

export default router
