import axios from "axios"
import { errorHandler } from "../utils"

const axiosConfig = {
  headers: { "Content-Type": "application/json" },
}

export const profileApi = async (body) => {
  try {
    const { data } = await axios.get("/api/users/profile")
    return data
  } catch (error) {
    return error
  }
}
