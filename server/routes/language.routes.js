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
import { uploadLanguagesImage } from "../utils/uploadImages.utils.js"

const router = express.Router()

router
  .route("/")
  .get(getLanguages)
  .post(protect, admin, uploadLanguagesImage.single("image"), createLanguage)
  .delete(protect, admin, deleteLanguages)
router
  .route("/:id")
  .get(getLanguageById)
  .put(protect, admin, uploadLanguagesImage.single("image"), updateLanguageById)
  .delete(protect, admin, deleteLanguageById)

export default router
