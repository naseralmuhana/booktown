import asyncHandler from "express-async-handler"
import { Book } from "../models/index.js"

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
export const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({})
  res.json(books)
})

// @desc    Fetch a single book by id
// @route   GET /api/books/:id
// @access  Public
export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error("Book not found")
  }
})

// @desc    Create a single book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = asyncHandler(async (req, res) => {
  const { name, image, description, rating, price, countInStock } = req.body
  const bookExists = await Book.findOne({ name })

  if (bookExists) {
    res.status(400)
    throw new Error(`${name} book already exists`)
  }

  const book = await Book.create({
    name,
    user: req.user._id,
    image,
    description,
    rating,
    price,
    countInStock,
  })

  if (book) {
    res.status(201).json(book)
  } else {
    res.status(400)
    throw new Error("Invalid book data")
  }
})

// @desc    Delete all books
// @route   DELETE /api/books
// @access  Private/Admin
export const deleteBooks = asyncHandler(async (req, res) => {
  await Book.deleteMany({})
  res.json({ message: "All books removed successfully" })
})

// @desc    Delete a single book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBookById = asyncHandler(async (req, res) => {
  const books = await Book.findById(req.params.id)
  if (books) {
    await books.remove()
    res.json({ message: "Book removed successfully" })
  } else {
    res.status(404)
    throw new Error("Book not found")
  }
})
