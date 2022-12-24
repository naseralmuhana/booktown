// export const validateHandler = (err, name) => {
//   let errors = {}
//   // Duplicate error code
//   if (err.code === 11000) {
//     errors.name = `[${name}] is already exists`
//     return errors
//   }
//   // Validation errors

//   if (err.message.includes("validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message
//     })
//   }
//   return errors
// }

const validateHandler = (err, name) => {
  let errors = {}
  // Upload image error

  // Validation errors
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}
export default validateHandler
