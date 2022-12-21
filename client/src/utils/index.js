export const errorHandler = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export { default as ProtectedRoute } from "./ProtectedRoute"
