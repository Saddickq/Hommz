import { useState, useContext, useEffect } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from "axios"
import { Navigate } from "react-router-dom";
import { userContext } from "../../context"
import { toast } from "react-toastify";

const BookingCard = ({ place }) => {
    const {user} = useContext(userContext)
    const [booking, setBooking] = useState({
        "name": "",
        "phone": "",
        "checkIn": "",
        "checkOut": "",
        "maxGuests": ""
    })
    const [redirect, setRedirect] = useState("")

    useEffect(() => {
        if (user) {
            setBooking(prev => {
                return { ...prev, name: user.username }
            })
        }
    }, [user])
    
    const handleBooking = (event) => {
        const {name, value} = event.target
        setBooking((prev => {
            return {
                ...prev,
                [name]: value
            }
        }))
    }

    let numberOfNights = 0
    if (booking.checkIn && booking.checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))
    }

    const bookThisPlace = async () => {
        if (!user) {
            setRedirect('/')
            toast.info("You have to be logged in")
            return
        }
        await axios.post('/bookings',
            { ...booking, place:place._id, price: (numberOfNights * place.price) + (0.1 * (numberOfNights * place.price)) }
        )
        setRedirect("/account/bookings")
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
  return (
    <div className="border shadow-lg p-4 bg-primary rounded-xl">
        <div className="mb-4 text-white font-semibold text-center"><span className="text-2xl">GH¢ {place.price}</span> per night</div>
        <div className=" border text- rounded-xl">
            <div className="flex">
                <div className="text-sm p-2 flex-1">
                    <label className="text-white font-semibold">CHECK-IN</label>
                    <input name="checkIn" value={booking.checkIn} onChange={handleBooking} type="date" className="p-1 rounded-lg" />
                </div>

                <div className="border-l text-sm p-2 flex-1">
                    <label className="text-white font-semibold">CHECK-OUT</label>
                    <input name="checkOut" value={booking.checkOut} onChange={handleBooking} type="date" className="p-1 rounded-lg" />
                </div>
            </div>
            <div className="border-t text-sm p-2">
                <label className="text-white font-semibold">GUESTS</label>
                <input name="maxGuests" value={booking.maxGuests} onChange={handleBooking} type="number" />
            </div>
        </div>
        {numberOfNights > 0 && (
            <div className="mt-3">
                <input type="text" name="name" placeholder="Your name" onChange={handleBooking} value={booking.name} required/>
                <input type="tel" name="phone" placeholder="Your Phone number" onChange={handleBooking} value={booking.phone} required/>
            </div>
        )}
        <button onClick={bookThisPlace} className="bg-primary text-white rounded-xl w-full py-2 font-bold my-4 outline outline-2 outline-offset-2 outline-white hover:bg-white hover:text-primary">Reserve</button>
        <p className="text-sm text-center mb-3 text-white">You won't be charged yet</p>
        <div>
            {numberOfNights > 0 && (
                <>
                    <div className="flex justify-between text-white font-semibold text-sm leading-5">
                        <p>{numberOfNights} nights × GH¢ {place.price}</p>
                        <span >GH¢ {numberOfNights * place.price}</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold text-sm my-3 pb-3">
                        <p>Hommz charge 10%</p>
                        <span>GH¢ {(0.1 * (numberOfNights * place.price)).toFixed(1)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-white font-bold mt-2">
                        <p>Total Price</p>
                        <span className="text-white">GH¢ {(numberOfNights * place.price) + (0.1 * (numberOfNights * place.price))}</span>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default BookingCard
