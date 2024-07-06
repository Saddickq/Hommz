import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { useState, useEffect } from "react"
import axios from "axios";


const PlacesPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        async function fetchPlaces() {
            const { data } = await axios.get("/user_places")
            setPlaces(data)
        }
        fetchPlaces();
    }, [])

    const deletePlace = async (placeId) => {
        try {
            const response = await axios.delete(`/places/${placeId}`);
            const deletedPlace = response.data;
    
            setPlaces(prevPlaces => prevPlaces.filter(place => place._id !== deletedPlace._id));
        } catch (error) {
            console.error("Error deleting place:", error);
        }
    };

  return (
    <div>
        <AccountNav />
        <div className="text-center">
            <Link className="inline-flex gap-2 items-center bg-primary py-2 px-4 text-sm md:text-base rounded-full text-white" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new place
            </Link>
            <div className="mt-5 mx-auto max-w-5xl">
                {places.length > 0 && places.map(place => {
                    return (
                        <div key={place._id} className="flex flex-col sm:flex-row bg-gray-300 mb-4 cursor-pointer gap-2 p-2  rounded-2xl">
                            <img src={"http://localhost:8000/uploads/" + place.photos[0]} alt="Photo" className="rounded-2xl object-cover sm:w-36" />
                            <div className="">
                                <Link to={"/account/places/" + place._id}>
                                    <h2 className="text-base md:text-lg font-semibold text-start">{place.title}</h2>
                                    <p className="text-xs md:text-sm text-start">{place.description}</p>
                                </Link>
                                <div className="mt-2 bg-primary hover:opacity-80 rounded-md">
                                    <button onClick={() => deletePlace(place._id)} className="py-1 text-white font-bold text-xs md:text-sm">
                                        Delete place
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default PlacesPage