import express from "express"
import {
  getLanguages,
  createLanguage,
  deleteLanguageById,
  deleteLanguages,
} from "../controllers/languageControllers.js"

const router = express.Router()

router.route("/").get(getLanguages).post(createLanguage).delete(deleteLanguages)
router.route("/:id").delete(deleteLanguageById)

export default router
