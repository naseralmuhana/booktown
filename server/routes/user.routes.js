import express from "express"
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  deleteUsers,
  deleteUserById,
  getUserById,
} from "../controllers/user.controllers.js"
import { protect, admin } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(registerUser)
  .delete(protect, admin, deleteUsers)

router.route("/login").post(authUser)
router.route("/profile").get(protect, getUserProfile)

router
  .route("/:id")
  .delete(protect, admin, deleteUserById)
  .get(protect, admin, getUserById)

export default router
