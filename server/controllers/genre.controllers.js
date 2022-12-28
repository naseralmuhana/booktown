import asyncHandler from "express-async-handler"
import constants from "../constants/index.js"
import validateHandler from "../middleware/validate.middleware.js"
import Genre from "../models/genre.model.js"
import path from "path"
import { removeUploadedFile } from "../utils/fileUpload.utils.js"

const __dirname = path.resolve()

// @desc    Get all genres
// @route   GET /api/genres
// @access  Public
export const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find({})
  res.json(genres)
})

// @desc    Create a single genre
// @route   POST /api/genres
// @access  Private/Admin
export const createGenre = asyncHandler(async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
    image: req.file?.path,
  })
  try {
    await genre.save()
    res.status(201).json(genre)
  } catch (error) {
    console.log(error)
    if (genre?.image) {
      removeUploadedFile(__dirname, genre?.image)
    }
    res.status(400).json(validateHandler(error))
  }
})

// @desc    Update a single genre
// @route   PUT /api/genres/:id
// @access  Private/Admin
export const updateGenreById = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findUpdateById({
      id: req.params.id,
      name: req.body?.name,
      image: req.file?.path,
    })
    res.status(200).json(genre)
  } catch (error) {
    res.status(400).json(error)
  }
})

// @desc    Fetch a single genre by id
// @route   GET /api/genres/:id
// @access  Public
export const getGenreById = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (genre) {
    res.json(genre)
  } else {
    res.status(404)
    throw new Error("Genre not found")
  }
})

// @desc    Delete a single genre
// @route   DELETE /api/genres/:id
// @access  Private/Admin
export const deleteGenreById = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (genre) {
    await genre.remove()
    res.json({ message: "Genre removed successfully" })
  } else {
    res.status(404)
    throw new Error("Genre not found")
  }
})

// genres.forEach((genre) => {
//   if (genre?.image) removeUploadedFile(__dirname, genre?.image)
// })
