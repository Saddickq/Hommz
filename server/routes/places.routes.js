import { Router } from "express"
import PlacesController from "../controllers/places.controller.js"

const router = Router()

router.post("/new_place", PlacesController.createPlace)

router.get("/user_places", PlacesController.showUserPlaces)

router.get("/places", PlacesController.showAllPlaces)

router.get("/places/:id", PlacesController.showPlace)

router.put("/places/:id", PlacesController.updatePlace)

router.delete("/places/:id", PlacesController.deletePlace)

export default router;