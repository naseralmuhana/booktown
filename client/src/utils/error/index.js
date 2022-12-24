export const errorHandler = (error) => {
  return error.response && error.response.data
    ? error.response.data
    : error.message
    ? error.message
    : "Something went wrong"
}
