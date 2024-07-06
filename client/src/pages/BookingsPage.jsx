import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav"
import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNightlightRound } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";

  

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get("/bookings").then(({ data }) => setBookings([ ...data ]))
    }, [])
	return (
		<>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => {
                    return (
                        <div key={booking._id} className="bg-gray-300 mb-4 rounded-xl overflow-hidden max-w-3xl mx-auto">
                            <Link to={`/account/bookings/${booking._id}`}  className="flex flex-col gap-2 sm:flex-row">
                                <img src={"http://localhost:8000/uploads/" + booking.place.photos[0]} alt="Photo" className="object-cover h-32" />
                    	        <div className="p-2">
                                    <h2 className="py-1 font-semibold">{booking.place.title}</h2>
                                    <div className="flex gap-2 items-center my-2">
                                        <FaRegCalendarAlt className="size-6" />{
                                        format(booking.checkIn, "yyyy-MM-dd")} &rarr; 
                                        <FaRegCalendarAlt className="size-6" />
                                        {format(booking.checkOut, "yyyy-MM-dd")}<br />
                                    </div>
                                    <div className="flex items-center gap-2 ">
                                        <MdNightlightRound className="size-6" />{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights  
                                        <span className="flex gap-3 text-primary font-semibold"><IoPricetagsOutline className="size-6" />Price: GH¢ {booking.price}</span>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    )
                })}
            </div>
        </>
	)
}
export default BookingsPage;