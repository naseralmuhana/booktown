import express from "express"
import {
  authUser,
  registerUser,
  getUser,
  updatedUser,
  getUsers,
  deleteUsers,
  deleteUserById,
  getUserById,
} from "../controllers/user.controllers.js"
import { protect, admin } from "../middleware/auth.middleware.js"
import { uploadUsersImage } from "../utils/index.js"

const router = express.Router()

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(uploadUsersImage.single("image"), registerUser)
  .delete(protect, admin, deleteUsers)
router.route("/login").post(authUser)
router
  .route("/profile")
  .get(protect, getUser)
  .put(protect, uploadUsersImage.single("image"), updatedUser)
router
  .route("/:id")
  .delete(protect, admin, deleteUserById)
  .get(protect, admin, getUserById)

export default router
