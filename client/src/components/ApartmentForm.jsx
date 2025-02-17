import React, { useState, useEffect } from 'react'
import AvailablePerks from "./AvailablePerks"
import PhotoUploader from "./PhotoUploader"
import CheckInAndOut from "./CheckInAndOut"
import Loading from './skeletons/Loading'
import axios from 'axios'
import { Navigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'

const ApartmentForm = () => {
    const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        address: "",
        description: "",
        perks: [],
        photos: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
        price: ""
    })

    const { id } = useParams()
    
    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/places/' + id).then(response => {
                const { data } = response
                setFormData({ ...data })
            })
        }
    }, [id])         

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }

    const handlePerksChange = (updatedPerks) => {
        setFormData((prevData) => ({
            ...prevData,
            perks: updatedPerks,
        }));
    };

    const handlePhotosChange = (updatedPhotos) => {
        setFormData((prevData) => ({
            ...prevData,
            photos: updatedPhotos,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const newPhotos = formData.photos.filter(photo => typeof photo !== 'string');
        const existingPhotos = formData.photos.filter(photo => typeof photo === 'string');
        
        const photoData = new FormData();
        newPhotos.forEach(photo => {
            photoData.append('photos', photo);
        });
        
        try {
            let uploadedPhotos = [];
            // Only upload if there are new photos
            if (newPhotos.length > 0) {
                const { data } = await axios.post('/upload', photoData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                uploadedPhotos = data.files;
            }
            const formDataWithPhotoURLs = {
                ...formData,
                photos: [ ...existingPhotos, ...uploadedPhotos ],
            };
            if (id) {
                await axios.put(`/places/${id}`, formDataWithPhotoURLs);
                toast.success('Your place has been updated successfully');
            } else {
                await axios.post('/new_place', formDataWithPhotoURLs);
                toast.success('Your place has been added successfully');
            }
            setRedirect(true);
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    };

    if (isLoading) {
        return <Loading />
    }
    if (redirect) {
        return <Navigate to={"/account/places"} />
    }
    
  return (
    <form className="max-w-5xl mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-primary">Title</h2>
        <p className="text-sm text-gray-500 -mb-1">Give your place a catchy name for advertisement</p>
        <input
            type="text"
            value={formData.title}
            name="title"
            onChange={handleChange}
            placeholder="e.g My sweet apartment"
        />
        <h2 className="text-2xl text-primary mt-3 font-bold">Address</h2>
        <p className="text-sm text-gray-500 -mb-1">Where can we find your place</p>
        <input
            value={formData.address}
            name="address"
            onChange={handleChange}
            type="text" placeholder="e.g Gbewaa Residential Area"
        />
        <h2 className="text-2xl text-primary mt-3 font-bold">Description</h2>
        <p className="text-sm text-gray-500 -mb-1">Give a brief description your place</p>
        <textarea
            value={formData.description}
            name="description"
            onChange={handleChange}
            placeholder="Describe your apartment"
        />
        
        <PhotoUploader photos={formData.photos} onPhotoChange={handlePhotosChange}/>

        <AvailablePerks value={formData.perks} onChange={handlePerksChange} />
        
        <h2 className="text-2xl text-primary -mb-1 font-bold">Extra Info</h2>                   
        <textarea placeholder="Anything about the apartment you wanna share?"
            value={formData.extraInfo}
            name="extraInfo"
            onChange={handleChange}
        />
        <CheckInAndOut
            handleChange={handleChange}
            checkIn={formData.checkIn}
            checkOut={formData.checkOut}
            maxGuests={formData.maxGuests}
            price={formData.price}
        />    
        <div className="cursor-pointer text-center bg-primary hover:opacity-80 p-2 my-5 rounded-xl">
            <button className="text-white font-bold">Save</button>
        </div>
    </form>
  )
}

export default ApartmentForm;