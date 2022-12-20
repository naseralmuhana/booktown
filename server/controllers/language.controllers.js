import asyncHandler from "express-async-handler"
import { Language } from "../models/index.js"

const validateHandler = (err, req, res) => {
  let errors = {}
  // Duplicate error code
  if (err.code === 11000) {
    errors.name = "This language is already exists"
    return errors
  }
  // Validation errors

  if (err.message.includes("Language validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// @desc    Fetch all languages
// @route   GET /api/languages
// @access  Public
export const getLanguages = asyncHandler(async (req, res) => {
  const languages = await Language.find({})
  res.json(languages)
})

// @desc    Fetch a single language by id
// @route   GET /api/languages/:id
// @access  Public
export const getLanguageById = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id)
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
  const { name } = req.body
  try {
    const language = await Language.create({ name })
    res.status(201).json(language)
  } catch (err) {
    res.status(400).json(validateHandler(err))
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
      const updatedLanguage = await language.save()
      res.json({
        _id: updatedLanguage._id,
        name: updatedLanguage.name,
        slug: updatedLanguage.slug,
      })
    } catch (err) {
      res.status(400).json(validateHandler(err))
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
