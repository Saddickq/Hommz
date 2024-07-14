import ShowAllPhotos from "../components/ShowAllPhotos"
import { useState } from "react"


const PlaceGallery = ({ place }) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false)
    
    if (showAllPhotos) {
        return (
            <ShowAllPhotos place={place} setShowAllPhotos={setShowAllPhotos} />
        )
    }
  return (
    <div className=" mt-4 animate-fade-in">
        <div className="grid overflow-hidden cursor-pointer rounded-2xl gap-2 grid-cols-[2fr_1fr]">
            <div className="h-96" onClick={() => setShowAllPhotos(true)}>
                {place.photos?.[0] && (
                    <img className="w-full h-full object-cover" src={place.photos[0]} alt="photo" />
                )}
            </div>
            <div className="grid gap-2 h-96 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                {place.photos?.[1] && (
                    <img className="h-full w-full object-cover" src={place.photos[1]} alt="photo" />
                )}
                {place.photos?.[2] && (
                    <img className="h-full w-full object-cover" src={place.photos[2]} alt="photo" />
                )}
            </div>
        </div>
    </div>
  )
}

export default PlaceGallery
