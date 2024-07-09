import { useParams, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import PlaceGallery from "../components/PlaceGallery"
import PlaceInfo from "../components/PlaceInfo"
import { toast } from "react-toastify"
import { format, differenceInCalendarDays } from "date-fns"
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNightlightRound } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";


const BookingPage = () => {
    const [booking, setBooking] = useState(null)
    const [redirect, setRedirection] = useState('')
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            axios.get("/bookings").then(({ data }) => {
                const foundedBooking = data.find(({ _id }) => _id === id)
                if (foundedBooking) {
                    setBooking(foundedBooking)
                }
            })
        }
    }, [id])
    if (!booking) {
        return ""
    }

    const cancleReservation = async () => {
        await axios.delete(`/bookings/${id}`)
        setRedirection("/")
        toast.info("You have cancelled your reservation")
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
  return (
    <div className="bg-gray-100 -mx-8 lg:px-32 px-8 mb-6">
        <h2 className="text-2xl text-gray-800 py-6 font-semibold">{booking.place.title}</h2>
        <div className="flex underline text-gray-700 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <a target={"_blank"} href={`https://maps.google.com/?q=${booking.place.address}`}>{booking?.place.address}</a>
        </div>
        <div className="flex items-center justify-between my-4 bg-gray-300 p-2 sm:p-4 rounded-2xl">
            <div className="">
                <h2 className="text-xl font-semibold">Your booking Information:</h2>
                <div className="flex gap-4 items-center my-3">
                    <FaRegCalendarAlt className="size-7" />
                    {format(booking.checkIn, "yyyy-MM-dd")} &rarr; 
                    <FaRegCalendarAlt className="size-7" />
                    {format(booking.checkOut, "yyyy-MM-dd")}<br />
                </div>
                <div className="flex items-center gap-4 ">
                    <MdNightlightRound className="size-7" />{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights  
                    <span className="flex gap-3 text-primary font-semibold"><IoPricetagsOutline className="size-7" />Price: GH¢ {booking.price}</span>
                </div>
            </div>
            <button onClick={cancleReservation} className="bg-primary text-white p-2 sm:p-3 rounded-xl font-bold">
                Cancel Reservation
            </button>
        </div>
        
        <PlaceGallery place={booking?.place} />
        <div className="my-6 border-gray-300">
            <h3 className="text-xl my-6 text-gray-800 font-semibold">About this place</h3>
            <p className="text-gray-600">{booking?.place.description}</p>
        </div>
        <PlaceInfo place={booking?.place} />
    </div>
  )
}

export default BookingPage
