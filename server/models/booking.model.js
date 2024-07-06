import { Schema, model } from "mongoose"

const BookingSchema = Schema(
    {
        place: {
            type: Schema.Types.ObjectId,
            ref: "Place",
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        price: { type: Number, required: true},
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true }
        
    },
    {
        timestamps: true
    }
)

const Booking = model("Bookings", BookingSchema)

export default Booking