import Booking from "../models/booking.model.js";
import { SECRET } from "../config/index.js";
import jwt from "jsonwebtoken"

class BookingsController {
  static createBooking(req, res) {
    const { checkIn, checkOut, name, phone, place, price, user } = req.body;
    Booking.create({ checkIn, checkOut, name, phone, place, price, user })
      .then((booking) => res.status(201).json(booking))
      .catch((err) => res.status(500).json(err));
  }
  
  static async showBookings(req, res) {

    const { token } = req.cookies;
    if (token) {
        const user = jwt.verify(token, SECRET);
        return res.status(200).json( await Booking.find({ user:user.userId }).populate("place") )
    }

    return res.status(404)
  }
  static async deleteBooking(req, res) {
    try {
        const { token } = req.cookies;
        const user = jwt.verify(token, SECRET);
        const { id } = req.params

        if (!user) {
            return res.status(404)
        }
        const booking = await Booking.findByIdAndDelete(id)
        return res.status(200)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }
}

export default BookingsController;
