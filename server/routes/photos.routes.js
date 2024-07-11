import { Router } from "express"
import multer from 'multer'
import PhotosController from "../controllers/photos.controller.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import path from "path"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const uploadsDir = path.resolve(__dirname, '../uploads');

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

router.post("/upload", upload.array("photos", 10), PhotosController.localUpload);

export default router;