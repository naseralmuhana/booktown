import express from "express"
import {
  authUser,
  deleteUsers,
  getUsers,
  registerUser,
} from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/").get(getUsers).post(registerUser).delete(deleteUsers)
router.route("/login").post(authUser)

export default router
