import express from "express"
import path from "path"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, res, next) {
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
    cb("Images only!")
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, res, cb) {
    checkFileType(file, cb)
  },
})

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
