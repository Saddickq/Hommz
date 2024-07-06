const PlaceInfo = ({ place }) => {
  return (
    <div>
        <h3 className="border-t py-6 border-gray-300 text-xl text-gray-800 font-semibold">Things to know</h3>
        <div className="flex gap-32">
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">What this place offers</h3>
                <div>
                    {place?.perks?.map(perk => {
                        return (
                            <div key={perk.name} className="text-gray-600 leading-7 flex items-center">
                                {perk.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 mb-2">House rules</h4>
                <div className="text-gray-600 leading-7">Check-in after {place.checkIn}</div>
                <div className="text-gray-600 leading-7">Checkout before {place.checkOut}</div>
                <div className="text-gray-600 leading-7">{place.maxGuests} Maxs Guests</div>
            </div>
        </div>
    </div>
  )
}

export default PlaceInfo
