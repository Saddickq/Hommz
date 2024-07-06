import { useState } from "react"
import axios from "axios"
import { FaFileUpload } from "react-icons/fa";


const PhotoUploader = ({ photos, onPhotoChange }) => {
	const [photoLink, setPhotoLink] = useState("")

	//local upload from computer files
	const uploadPhoto = async (event) => {
        const files = event.target.files
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        
        const response = await axios.post("/upload", data, {
            headers: {"Content-type":"multipart/form-data"}
        })

        const newFile = response.data.files
        onPhotoChange([ ...photos, ...newFile ])
    }

    //upload photo using photolink(url)
	const handleUpload = async (event) => {
        event.preventDefault()
        const { data } = await axios.post('/upload_photos_by_link', { link: photoLink })
        onPhotoChange([ ...photos, data ])
        setPhotoLink("")
    }

    //Remove photo from List of photos
    const removePhoto = (photoname) => {
    	onPhotoChange([ ...photos.filter(photo => photo !== photoname) ])
    }
	return (
		<>
			<h2 className="text-2xl text-primary font-bold">Photos</h2>
	        <p className="text-sm text-gray-500 -mb-1">Provide pictures of the apartment or place</p>
	        <div className="flex items-center">
	            <input type="text"
	                value={photoLink}
	                name="photoLink"
	                onChange={event => setPhotoLink(event.target.value)}
	                placeholder="Upload photo using a link" />
	            <button onClick={handleUpload} className="text-gray-800 mx-2 gap-1 bg-gray-300 py-2 px-3 rounded-xl">
	                Add&nbsp;Photos
	            </button>
	        </div>
	        <p className="text-sm mt-3 text-gray-500">Add photos from your gallery</p>
	        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 ">
	            <label className="cursor-pointer flex items-center text-gray-900 gap-2 bg-gray-300 py-7 h-32 justify-center rounded-xl">
	                <input type="file" className='hidden' onChange={uploadPhoto} />
	                <FaFileUpload className="size-7" />
	                Upload
	            </label>
	            {photos.length > 0 && photos.map(link => {
	                return (
	                    <div className="h-32 relative" key={link}>
	                        <img className="rounded-xl h-full w-full object-cover " src={"http://localhost:8000/uploads/" + link} />
	                        <button onClick={() => removePhoto(link)} className="absolute top-2 right-3 bg-gray-500 bg-opacity-60 rounded-lg p-1">
	                        	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white cursor-pointer">
								  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
								</svg>
	                        </button>
	                    </div>
	                )
	              })
	            }
	        </div>
		</>
	)
}
export default PhotoUploader;