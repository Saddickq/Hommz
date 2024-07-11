class PhotosController {

    static localUpload (req, res) {
        const uploadedfiles = []
        for (let i=0; i < req.files.length; i++) {
            uploadedfiles.push(req.files[i].filename)
        }
        return res.status(200).json({ files: uploadedfiles })
    }
	// static async uploadByLink(req, res) {
	// 	const { link } = req.body

	// 	const newFile = 'photo.' + Date.now() + ".jpg"

	// 	const options = {
	// 		url: link,
	// 		dest: path.join(uploadsDir, newFile)
	// 	}
	// 	await download
	// 		.image(options)
	// 		.then(filename => res.status(200).json(newFile))
	// 		.catch(error => res.status(400).json(error.message))
	// }

};

export default PhotosController;