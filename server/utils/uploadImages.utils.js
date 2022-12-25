import path from "path"
import multer from "multer"

// set uploaded filename in the database
const filename = function (req, file, cb) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
  const fileExtname = path.extname(file.originalname)
  cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtname}`)
}
// Check the file extension type
const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/
  const checkExtname = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const checkMimetype = fileTypes.test(file.mimetype)

  if (checkExtname && checkMimetype) {
    return cb(null, true)
  } else {
    cb(new Error("Images only! [jpg, png, jpeg]"))
  }
}

const storageLanguages = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/languages/")
  },
  filename,
})

const storageUsers = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/users/")
  },
  filename,
})

export const uploadUsersImage = multer({
  storage: storageUsers,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
export const uploadLanguagesImage = multer({
  storage: storageLanguages,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
