import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const fileExtname = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtname}`)
  },
})

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

const uploadImg = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

export default uploadImg
