import { FaAngleLeft } from "react-icons/fa6";

const ShowAllPhotos = ({ place, setShowAllPhotos }) => {
  return (
    <div className="absolute bg-black top-0 left-0 right-0">
        <button onClick={()=>setShowAllPhotos(false)} className="flex cursor-pointer m-8 fixed py-1 px-2 bg-black shadow-lg hover:opacity-60 rounded-full font-semibold text-primary">
            <FaAngleLeft className="size-7" />
        </button>
        <div className="py-6 mx-3 grid gap-4">
            {place?.photos?.length && place.photos.map(photo => {
                return (
                    <div key={photo}>
                        <img className="w-full md:max-h-96 mx-auto object-contain" src={photo} alt="Photos" />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ShowAllPhotos
