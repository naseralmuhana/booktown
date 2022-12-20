import asyncHandler from "express-async-handler"
import { User } from "../models/index.js"
import { generateToken } from "../utils/index.js"

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
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
  const { name, email, password, isAdmin } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error(`User already exists`)
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private/Admin
export const getUserProfile = asyncHandler(async (req, res) => {
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
