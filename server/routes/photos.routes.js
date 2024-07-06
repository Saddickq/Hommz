import { Router } from "express"
import multer from 'multer'
import PhotosController from "../controllers/photos.controller.js"

const router = Router()

router.post("/upload_photos_by_link", PhotosController.uploadByLink);

const photosMiddleware = multer({dest: "uploads"})
router.post("/upload", photosMiddleware.array("photos", 100), PhotosController.localUpload);

export default router;