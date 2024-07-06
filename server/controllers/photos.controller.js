import { fileURLToPath } from 'url';
import { dirname } from 'path'
import fs from "fs"
import path from "path"
import download from "image-downloader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const uploadsDir = path.resolve(__dirname, '../uploads');

class PhotosController {

	static async uploadByLink(req, res) {
		const { link } = req.body

		const newFile = 'photo.' + Date.now() + ".jpg"

		const options = {
			url: link,
			dest: path.join(uploadsDir, newFile)
		}
		await download
			.image(options)
			.then(filename => res.status(200).json(newFile))
			.catch(error => res.status(400).json(error.message))
	}

	static localUpload (req, res) {
		const uploadedfiles = []
		for (let i=0; i < req.files.length; i++) {
		    const {path, originalname} = req.files[i]
		    const parts = originalname.split(".")
		    const ext = parts[parts.length - 1]
		    const newPath = path + "." + ext
		    fs.renameSync(path, newPath)
		    uploadedfiles.push(newPath.replace("uploads/", ""))
		}
		res.status(200).json({ files: uploadedfiles })
	}
};

export default PhotosController;