import asyncHandler from "express-async-handler"
import { User } from "../models/index.js"
import { generateToken } from "../utils/index.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin (Public for now)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error(`User already exists`)
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      slug: user.slug,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Delete all users
// @route   DELETE /api/users
// @access  Private/Admin (Public for now)
export const deleteUsers = asyncHandler(async (req, res) => {
  await User.deleteMany({})
  res.json({ message: "User Removed" })
})
