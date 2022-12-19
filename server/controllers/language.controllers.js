import asyncHandler from "express-async-handler"
import { Language } from "../models/index.js"

// @desc    Fetch all languages
// @route   GET /api/languages
// @access  Public
export const getLanguages = asyncHandler(async (req, res) => {
  const languages = await Language.find({})
  res.json(languages)
})

// @desc    Create a single language
// @route   POST /api/languages
// @access  Private/Admin (Public for now)
export const createLanguage = asyncHandler(async (req, res) => {
  const { name } = req.body
  const languageExists = await Language.findOne({ name })

  if (languageExists) {
    res.status(400)
    throw new Error(`${name} language already exists`)
  }
  const language = await Language.create({ name })

  if (language) {
    res.status(201).json(language)
  } else {
    res.status(400)
    throw new Error("Invalid language data")
  }
})

// @desc    Delete all languages
// @route   DELETE /api/languages
// @access  Private/Admin (Public for now)
export const deleteLanguages = asyncHandler(async (req, res) => {
  await Language.deleteMany({})
  res.json({ message: "All languages removed successfully" })
})

// @desc    Delete a single language
// @route   DELETE /api/languages/:id
// @access  Private/Admin (Public for now)
export const deleteLanguageById = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id)
  if (language) {
    await language.remove()
    res.json({ message: "Language removed successfully" })
  } else {
    res.status(404)
    throw new Error("Language not found")
  }
})
