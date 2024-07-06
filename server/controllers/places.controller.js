import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";
import Place from "../models/place.model.js";

class PlacesController {
  static async showUserPlaces(req, res) {
    try {
      const { token } = req.cookies;
      const user = jwt.verify(token, SECRET);

      const places = await Place.find({ owner: user.userId });
      return res.status(200).json(places);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
  static async createPlace(req, res) {
    try {
      const formData = req.body;
      const { token } = req.cookies;

      const user = jwt.verify(token, SECRET);

      const newPlace = await Place.create({
        owner: user.userId,
        ...formData,
      });
      return res.status(201).json(newPlace);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
  static async showAllPlaces(req, res) {
    try {
      const places = await Place.find();
      return res.status(200).json(places);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
  static async showPlace(req, res) {
    try {
      const { id } = req.params;
      const place = await Place.findById(id);
      return res.status(200).json(place);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
  static async updatePlace(req, res) {
    try {
      const { id } = req.params;
      const { token } = req.cookies;
      const {
        title,
        description,
        address,
        photos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = req.body;

      const user = await jwt.verify(token, SECRET);
      const place = await Place.findById(id);

      if (user.userId === place.owner.toString()) {
        place.set({
          title,
          description,
          address,
          photos,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });

        await place.save();
        return res.status(200).json(place);
      }
      return res
        .status(401)
        .json({ message: "You are not authorized to update this place" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  static async deletePlace(req, res) {
    try {
      const { token } = req.cookies;
      const user = jwt.verify(token, SECRET);
      const { id } = req.params;

      if (!user) {
        return res.status(401);
      }
      const place = await Place.findByIdAndDelete(id);
      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      return res.status(200).json(place);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default PlacesController;
