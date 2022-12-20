import asyncHandler from "express-async-handler"
import { validateHandler } from "../middleware/validate.middleware.js"
import { Language } from "../models/index.js"

// @desc    Fetch all languages
// @route   GET /api/languages
// @access  Public
export const getLanguages = asyncHandler(async (req, res) => {
  const languages = await Language.findWithPopulate({})
  res.json(languages)
})

// @desc    Fetch a single language by id
// @route   GET /api/languages/:id
// @access  Public
export const getLanguageById = asyncHandler(async (req, res) => {
  const language = await Language.findByIdWithPopulate(req.params.id)
  if (language) {
    res.json(language)
  } else {
    res.status(404)
    throw new Error("Language not found")
  }
})

// @desc    Create a single language
// @route   POST /api/languages
// @access  Private/Admin
export const createLanguage = asyncHandler(async (req, res) => {
  try {
    const language = await Language.create({
      createdBy: req.user._id,
      updatedBy: req.user._id,
      ...req.body,
    })
    res.status(201).json(language)
  } catch (err) {
    res.status(400).json(validateHandler(err, req.body.name))
  }
})

// @desc    Update a single language
// @route   PUT /api/languages/:id
// @access  Private/Admin
export const updateLanguageById = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id)
  if (language) {
    try {
      language.name = req.body.name
      language.description = req.body.description
      language.updatedBy = req.user._id
      await language.save()
      res.status(201).json(language)
    } catch (err) {
      res.status(400).json(validateHandler(err, req.body.name))
    }
  } else {
    res.status(404)
    throw new Error("Language not found")
  }
})

// @desc    Delete all languages
// @route   DELETE /api/languages
// @access  Private/Admin
export const deleteLanguages = asyncHandler(async (req, res) => {
  await Language.deleteMany({})
  res.json({ message: "All languages removed successfully" })
})

// @desc    Delete a single language
// @route   DELETE /api/languages/:id
// @access  Private/Admin
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
