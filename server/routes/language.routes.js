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
  .post(createLanguage) // protect, admin,
  .delete(deleteLanguages) // protect, admin,

router
  .route("/:id")
  .get(getLanguageById)
  .put(updateLanguageById) // protect, admin,
  .delete(deleteLanguageById) // protect, admin,

export default router
