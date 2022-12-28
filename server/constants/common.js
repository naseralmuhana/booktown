import validator from "validator"
import constants from "./index.js"

const modelNameSettings = {
  type: String,
  required: [true, constants.requiredValidationMessage],
  unique: true,
  uniqueCaseInsensitive: true,
  trim: true,
  validate: {
    validator: (value) =>
      validator.isAlphanumeric(validator.blacklist(value, " -.")),
    message: constants.AlphanumericValidationMessage,
  },
}
const modelSlugSettings = { type: String, slug: "name", unique: true }

const common = { modelNameSettings, modelSlugSettings }

export default common
