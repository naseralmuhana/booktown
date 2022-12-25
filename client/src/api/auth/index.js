import axios from "axios"

const USER_BASE_URL = "/api/users"
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTc5YjgxYTNmYzBiMjg1YmFhNGU5MCIsImlhdCI6MTY3MTkyODcxMCwiZXhwIjoxNjc0NTIwNzEwfQ.dWhbIiEnBv35QnbZHX0F0a3bPa9aD6spEXsx9A-lvWk"

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
export const authUser = async (requestData) => {
  const { data } = await axios.post(`${USER_BASE_URL}/login`, requestData, {
    headers: { "Content-Type": "application/json" },
  })
  return data
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
export const getUsers = () => axios.get(USER_BASE_URL, protectConfig)
