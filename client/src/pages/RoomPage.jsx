import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BookingCard from "../components/BookingCard"
import PlaceInfo from "../components/PlaceInfo"
import PlaceGallery from "../components/PlaceGallery"
import { FaMapLocationDot } from "react-icons/fa6";

const RoomPage = () => {
	const [place, setPlace] = useState({})

	const { id } = useParams()

	useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/places/' + id).then(response => {
                const { data } = response
                setPlace({ ...data })
            })
        }
    }, [id])
    
	return (
	    <div className="bg-gray-100 -mx-8 lg:px-32 px-8">
	        <h2 className="text-2xl text-gray-800 py-6 font-semibold">{place.title}</h2>
            <div className="flex gap-2 underline text-gray-700 font-semibold">
                <FaMapLocationDot className="size-7" />
                <a target={"_blank"} href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>
            </div>

            <PlaceGallery place={place} />
            <h2 className="text-2xl text-gray-800 font-semibold mt-4">Room in {place.address}</h2>
                
	        <div className="py-8 flex flex-col sm:flex-row gap-8">
                <div className="border-t border-gray-300">
                    <h3 className="text-xl my-6 text-gray-800 font-semibold">About this place</h3>
                    <p className="text-gray-600">{place.description}</p>
                </div>
                <BookingCard place={place} />
	        </div>
            <PlaceInfo place={place} />
            <div className="mb-6 border-gray-300">
                <h3 className="text-xl my-5 text-gray-800 font-semibold">Extra Info</h3>
                <p className="text-gray-600">{place.extraInfo}</p>
            </div>
            <div>
                <h2 className="border-t py-6 border-gray-300 text-xl text-gray-800 font-semibold">Meet the host</h2>
                <h3 className="text-xl text-gray-800 font-semibold">username</h3>
            </div>
	    </div>
	)

}
export default RoomPage;