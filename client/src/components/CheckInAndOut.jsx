const CheckInAndOut = ({ handleChange, checkIn, checkOut, maxGuests, price }) => {
	
	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
                <span className="text-primary text-l font-bold">Check In</span>
                <input type="text"
                    value={checkIn}
                    name="checkIn"
                    onChange={handleChange}
                    placeholder="17:00"/>
            </div>
            <div>
                <span className="text-primary text-l font-bold">Check Out</span>
                <input type="text"
                    value={checkOut}
                    name="checkOut"
                    onChange={handleChange}
                    placeholder="06:00" />
            </div>
            <div>
                <span className="text-primary text-l font-bold">Max number of guest</span>
                <input type="number"
                    value={maxGuests}
                    name="maxGuests"
                    onChange={handleChange}
                    placeholder="3 people" />
            </div>
            <div>
                <span className="text-primary text-l font-bold">Price per night</span>
                <input type="text"
                    value={price}
                    name="price"
                    onChange={handleChange}
                    placeholder="¢ 00" />
            </div>
        </div>
    )
}
export default CheckInAndOut;