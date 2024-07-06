import { Router } from "express"
import BookingsController from "../controllers/bookings.controller.js"

const router = Router()

router.post("/bookings", BookingsController.createBooking)

router.get("/bookings", BookingsController.showBookings)

router.delete("/bookings/:id", BookingsController.deleteBooking)

export default router;