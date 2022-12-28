import path from "path"
import fs from "fs"
import multer from "multer"

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

// Common diskStorage
const diskStorage = (dest) => ({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const fileExtname = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtname}`)
  },
})

// Common multer
const multerContent = (storage) => ({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// Storages
const usersStorage = multer.diskStorage(diskStorage("uploads/users/"))
const authorsStorage = multer.diskStorage(diskStorage("uploads/authors/"))

// Multer Uploads
export const usersFileUpload = multer(multerContent(usersStorage))
export const authorsFileUpload = multer(multerContent(authorsStorage))

// remove uploaded File
export const removeUploadedFile = (__dirname, file) => {
  fs.unlink(path.join(__dirname, file), (err) => {
    if (err) console.error(err)
  })
}
