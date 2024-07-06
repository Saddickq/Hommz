import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const HomePage = () => {

	const [places, setPlaces] = useState([])

	useEffect(() => {
		axios.get("/places").then(response => {
			const { data } = response
			setPlaces([ ... data ])
		})
	}, [])
    
	return (
		<div className="my-6 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{places.length > 0 && places.map(place => {
				return (
					<Link to={"/place/" + place._id} className="cursor-pointer" key={place._id}>
						<div className="flex flex-col">
							<img className="rounded-xl object-cover aspect-square" src={"http://localhost:8000/uploads/" + place.photos[0]} alt="Photo" />
							<h2 className="font-bold text-sm md:text-l text-gray-900 mt-2">{place.address}</h2>
							<h3 className="text-xs sm:text-sm md:text-base">{place.title}</h3>
							<h4 className="font-bold text-primary text-sm md:text-l">¢{place.price} Per night</h4>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
export default HomePage