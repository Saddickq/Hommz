import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const HomePage = () => {

	const [places, setPlaces] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/places")
			setPlaces([ ...data ])
            setIsLoading(false)
		}
        catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }
	useEffect(() => {
		fetchData()
	}, [])
    
	return (
		<div className="my-6 grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className="cursor-pointer animate-pulse" key={index}>
                        <div className="flex flex-col">
                            <div className="bg-gray-300 rounded-lg h-44 sm:h-64"></div>
                            <h2 className="bg-gray-300 h-3 rounded mt-2"></h2>
                            <h3 className="bg-gray-300 h-3 rounded mt-2 w-3/4"></h3>
                            <h4 className="bg-gray-300 h-3 rounded mt-2 w-1/2"></h4>
                        </div>
                    </div>
                ))
            ) : (
                places.length > 0 && places.map(place => (
                    <Link to={"/place/" + place._id} className="cursor-pointer" key={place._id}>
                        <div className="flex rounded-lg flex-col">
                            <img className="rounded-lg mb-2 object-cover h-44 sm:h-64" src={place.photos[0]} alt="Photo" />
                            <h2 className="font-bold text-xs sm:tex-l text-gray-900">{place.address}</h2>
                            <h3 className="text-xs sm:text-sm">Hosted by {place.owner.username}</h3>
                            <h4 className="font-bold text-primary text-xs sm:tex-l">¢{place.price} Per night</h4>
                        </div>
                    </Link>
                )))
            }
		</div>
	)
}
export default HomePage