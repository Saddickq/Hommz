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
		<div className="my-6 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className="cursor-pointer animate-pulse" key={index}>
                        <div className="flex flex-col">
                            <div className="bg-gray-300 rounded-lg aspect-square"></div>
                            <h2 className="bg-gray-300 h-4 rounded mt-2"></h2>
                            <h3 className="bg-gray-300 h-4 rounded mt-2 w-3/4"></h3>
                            <h4 className="bg-gray-300 h-4 rounded mt-2 w-1/2"></h4>
                        </div>
                    </div>
                ))
            ) : (
                places.length > 0 && places.map(place => (
                    <Link to={"/place/" + place._id} className="cursor-pointer" key={place._id}>
                        <div className="flex flex-col">
                            <img className="rounded-lg object-cover aspect-square" src={place.photos[0]} alt="Photo" />
                            <h2 className="font-bold leading-4 text-sm md:text-l text-gray-900 mt-2">{place.address}</h2>
                            <h3 className="text-xs sm:text-sm md:text-base">{place.title}</h3>
                            <h4 className="font-bold text-primary text-sm md:text-l">¢{place.price} Per night</h4>
                        </div>
                    </Link>
                )))
            }
		</div>
	)
}
export default HomePage