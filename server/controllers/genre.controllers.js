import asyncHandler from "express-async-handler"
import { Genre } from "../models/index.js"

// @desc    Fetch all genres
// @route   GET /api/genres
// @access  Public
export const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find({})
  res.json(genres)
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

// @desc    Create a single genre
// @route   POST /api/genres
// @access  Private/Admin
export const createGenre = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body
  const genreExists = await Genre.findOne({ name })

  if (genreExists) {
    res.status(400)
    throw new Error(`${name} genre already exists`)
  }
  const genre = await Genre.create({ name, image, description })

  if (genre) {
    res.status(201).json(genre)
  } else {
    res.status(400)
    throw new Error("Invalid genre data")
  }
})

// @desc    Delete all genres
// @route   DELETE /api/genres
// @access  Private/Admin
export const deleteGenres = asyncHandler(async (req, res) => {
  await Genre.deleteMany({})
  res.json({ message: "All genres removed successfully" })
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
