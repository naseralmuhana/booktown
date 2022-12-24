import axios from "axios"

const USER_BASE_URL = "/api/users"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTc2NTQzYTM2MDQ1ZjQ2ZDUwYjQxZiIsImlhdCI6MTY3MTkxNDgyMiwiZXhwIjoxNjc0NTA2ODIyfQ.iN-WJ9DSXm5NPwHP3dIzBKUYSX5_KpmzIso_w3V654I"

const globeConfig = { headers: { "content-type": "multipart/form-data" } }
// const globeConfig = { headers: { accept: "*/*" } }
const protectConfig = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
}

// @desc    Register users
// @route   POST /api/users
// @access  Public
export const registerUser = async (requestData) => {
  const { data } = await axios.post(USER_BASE_URL, requestData, globeConfig)
  return data
}

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async () => {
  const { data } = await axios.get(USER_BASE_URL, protectConfig)
  return data
}
