import express from "express"
import {
  deleteUsers,
  getUsers,
  registerUser,
} from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/").get(getUsers).post(registerUser).delete(deleteUsers)

export default router
