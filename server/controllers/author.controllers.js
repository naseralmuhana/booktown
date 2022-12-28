import asyncHandler from "express-async-handler"
import path from "path"
import Author from "../models/author.model.js"

const __dirname = path.resolve()

// @desc    Fetch all authors
// @route   GET /api/authors
// @access  Public
export const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find({})
  res.json(authors)
})

// @desc    Fetch a single author by id
// @route   GET /api/authors/:id
// @access  Public
export const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id)
  if (author) {
    res.json(author)
  } else {
    res.status(404)
    throw new Error("Author not found")
  }
})

// @desc    Create a single author
// @route   POST /api/authors
// @access  Private/Admin
export const createAuthor = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body
  const authorExists = await Author.findOne({ name })

  if (authorExists) {
    res.status(400)
    throw new Error(`${name} author already exists`)
  }
  const author = await Author.create({ name, image, description })

  if (author) {
    res.status(201).json(author)
  } else {
    res.status(400)
    throw new Error("Invalid author data")
  }
})

// @desc    Delete all authors
// @route   DELETE /api/authors
// @access  Private/Admin
export const deleteAuthors = asyncHandler(async (req, res) => {
  await Author.deleteMany({})
  res.json({ message: "All authors removed successfully" })
})

// @desc    Delete a single author
// @route   DELETE /api/authors/:id
// @access  Private/Admin
export const deleteAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id)
  if (author) {
    await author.remove()
    res.json({ message: "Author removed successfully" })
  } else {
    res.status(404)
    throw new Error("Author not found")
  }
})

// image: req.file?.path,
// if (language?.image) {
//   removeUploadedFile(__dirname, language?.image)
// }
