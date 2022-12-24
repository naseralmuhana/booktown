import asyncHandler from "express-async-handler"
import validateHandler from "../middleware/validate.middleware.js"
import { User } from "../models/index.js"
import { generateToken } from "../utils/index.js"

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const user = await User.findOneByEmail(req.body.email)
  if (user && (await user.matchPassword(req.body.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      slug: user.slug,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      slug: user.slug,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(400).json(validateHandler(error))
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      slug: user.slug,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update a user profile
// @route   POST /api/users/profile
// @access  Private
export const updatedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    try {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password || user.password
      }
      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } catch (error) {
      res.status(400).json(validateHandler(error))
    }
  }
})

/**
 * ADMIN
 */
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    GET a single user by id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      slug: user.slug,
    })
  } else {
    res.status(404)
    throw new Error(`User ${req.params.id} not found`)
  }
})

// @desc    Delete a single user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: "User Removed" })
  } else {
    res.status(404)
    throw new Error(`User ${req.params.id} not found`)
  }
})

// @desc    Delete all users
// @route   DELETE /api/users
// @access  Private/Admin
export const deleteUsers = asyncHandler(async (req, res) => {
  await User.deleteMany({})
  res.json({ message: "User Removed" })
})
