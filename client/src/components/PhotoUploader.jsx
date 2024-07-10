import { useState, useEffect } from "react"
import { FaFileUpload } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


const PhotoUploader = ({ photos, onPhotoChange }) => {
	const [photoLink, setPhotoLink] = useState("")
    // const [photoData, setPhotoData] = useState([])

    useEffect(() => {
        console.log(photos)
        // console.log("photoData", photoData);
    }, [photos]);

	//local upload from computer files
	const uploadPhoto = async (event) => {
        const files = event.target.files

        // const data = new FormData();
        const imagesFiles = []
        for (let i = 0; i < files.length; i++) {
            // data.append('photos', files[i])
            imagesFiles.push(URL.createObjectURL(files[i]))
        }
        // setPhotoData(prev => [ ...prev, ...imagesFiles ])

        // const response = await axios.post("/upload", data, {
        //     headers: {"Content-type":"multipart/form-data"}
        // })
        // const newFile = response.data.photoData
        onPhotoChange([ ...photos, ...imagesFiles ])
    }

    //upload photo using photolink(url)
	const handleUpload = async (event) => {
        event.preventDefault()
        // const { data } = await axios.post('/upload_photos_by_link', { link: photoLink })
        onPhotoChange([ ...photos, photoLink ])
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
	                <input type="file" className='hidden' name="photos" onChange={uploadPhoto} multiple/>
	                <FaFileUpload className="size-7" />
	                Upload
	            </label>
	            {photos.length > 0 && photos.map(photo => {
	                return (
	                    <div className="h-32 relative" key={photo}>
	                        <img className="rounded-xl h-full w-full object-cover " src={photo} />
	                        <button onClick={() => removePhoto(photo)} className="absolute top-2 right-3 bg-gray-500 bg-opacity-60 rounded-lg p-1">
                                <FaRegTrashCan className="size-5 text-white cursor-pointer" />
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