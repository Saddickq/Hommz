import { Schema, model } from "mongoose"

const PlaceSchema = Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        photos:[String],
        perks: [{
            name: String,
            svgUrl: String
        }],
        extraInfo: String,
        checkIn: String,
        checkOut: String,
        maxGuests: Number,
        price: Number
    },
    {
        timestamps: true
    }
)

const Place = model("Place", PlaceSchema)

export default Place;