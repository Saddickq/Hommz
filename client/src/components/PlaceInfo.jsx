const PlaceInfo = ({ place }) => {
  return (
    <div>
        <h3 className="border-t py-6 border-gray-300 text-lg sm:text-xl text-gray-800 font-semibold">Things to know</h3>
        <div className="flex gap-4 justify-between">
            <div className="text-sm sm:text-base">
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
            <div className="text-sm sm:text-base">
                <h4 className="font-semibold text-gray-800 mb-2">House rules</h4>
                <div className="text-gray-600 leading-7">Check-in after {place.checkIn}</div>
                <div className="text-gray-600 leading-7">Checkout before {place.checkOut}</div>
                <div className="text-gray-600 leading-7">{place.maxGuests} Maxs Guests</div>
            </div>
            <div className="text-sm sm:text-base">
                <h2 className="font-semibold text-gray-800 mb-2">Meet the host</h2>
                <img src={place.owner.avatar} className="rounded-full mb-4 border border-gray-400 size-20" />
                <h4 className="font-semibold text-gray-800 mb-2">{place.owner.username}</h4>
                <h4 className="text-gray-600 leading-7">{place.owner.email}</h4>
            </div>
        </div>
    </div>
  )
}

export default PlaceInfo
