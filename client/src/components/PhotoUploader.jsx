import { useEffect } from "react"
import { FaFileUpload } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


const PhotoUploader = ({ photos, onPhotoChange }) => {

    useEffect(() => {
        // console.log(photos)
    }, [photos]);

	//local upload from computer files
	const uploadPhoto = async (event) => {
        const files = event.target.files

        const imagesFiles = []
        for (let i = 0; i < files.length; i++) {
            imagesFiles.push(files[i])
        }
        onPhotoChange([ ...photos, ...imagesFiles ])
    }
    const getImage = (photo) => {
        const isFile = photo instanceof File
        return isFile ? URL.createObjectURL(photo) : photo
    }

    //Remove photo from List of photos
    const removePhoto = (photoname) => {
    	onPhotoChange([ ...photos.filter(photo => photo !== photoname) ])
    }
	return (
		<>
			<h2 className="text-2xl text-primary font-bold">Photos</h2>
	        <p className="text-sm text-gray-500 -mb-1">Provide pictures of the apartment or place</p>
	        <div className="grid grid-cols-2 sm:grid-cols-3 mt-2 gap-2 md:grid-cols-4 ">
	            <label className="cursor-pointer flex items-center text-gray-900 gap-2 bg-gray-300 py-7 h-32 justify-center rounded-xl">
	                <input type="file" className='hidden' name="photos" onChange={uploadPhoto} multiple/>
	                <FaFileUpload className="size-7" />
	                Upload
	            </label>
	            {photos.length > 0 && photos.map((photo, index) => {
                    const image = getImage(photo)
	                return (
	                    <div className="h-32 relative animate-fade-in" key={index}>
	                        <img className="rounded-xl h-full w-full object-cover" src={image} />
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