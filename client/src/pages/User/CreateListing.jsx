import React, { useState } from 'react';
import Header from '../../components/Header';
import { Input, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons not appearing correctly in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function CreateListing() {
  const [listing, setListing] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: '',
    discountPrice: '',
    bedrooms: '',
    bathrooms: '',
    furnished: false,
    parking: false,
    type: 'sale',
    regularPrice:'',
    discountedPrice:'',
    offer: false,
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setListing({
      ...listing,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setListing({
          ...listing,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(listing);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setListing({
          ...listing,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    return listing.latitude && listing.longitude ? (
      <Marker position={[listing.latitude, listing.longitude]} />
    ) : null;
  }

  return (
    <div>
      <Header />
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
          Create a Listing
        </h1>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Form fields */}
            <Input 
              type='text' 
              placeholder='Name' 
              className='border p-2 rounded-lg w-full text-sm' 
              id='name' 
              value={listing.name}
              onChange={handleChange}
              maxLength='62' 
              minLength='10' 
              required 
            />
            <textarea 
              placeholder='Description' 
              className='border p-2 rounded-lg h-20 md:h-auto w-full text-sm' 
              id='description' 
              value={listing.description}
              onChange={handleChange}
              required 
            />
            <Input 
              type='text' 
              placeholder='Address' 
              className='border p-2 rounded-lg w-full text-sm' 
              id='address' 
              value={listing.address}
              onChange={handleChange}
              required 
            />

            {/* Checkboxes */}
            <div className='flex flex-wrap gap-6'>
              <div className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  id='sale' 
                  className='w-4' 
                  checked={listing.type === 'sale'}
                  onChange={() => setListing({
                    ...listing,
                    type: listing.type === 'sale' ? '' : 'sale'
                  })}
                />
                <span className='text-sm'>Sell</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  id='rent' 
                  className='w-4' 
                  checked={listing.type === 'rent'}
                  onChange={() => setListing({
                    ...listing,
                    type: listing.type === 'rent' ? '' : 'rent'
                  })}
                />
                <span className='text-sm'>Rent</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  id='parking' 
                  className='w-4' 
                  checked={listing.parking}
                  onChange={handleChange}
                />
                <span className='text-sm'>Parking spot</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  id='furnished' 
                  className='w-4' 
                  checked={listing.furnished}
                  onChange={handleChange}
                />
                <span className='text-sm'>Furnished</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input 
                  type='checkbox' 
                  id='offer' 
                  className='w-4' 
                  checked={listing.offer}
                  onChange={handleChange}
                />
                <span className='text-sm'>Offer</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Input 
                type="number" 
                id='bedrooms' 
                min='1' 
                max='10' 
                value={listing.bedrooms} 
                onChange={handleChange} 
                className='p-2 border border-gray-300 rounded-lg text-sm'
                required
              />
              <p className='text-sm'>Beds</p>
            </div>
           
            <div className='flex items-center gap-2'>
              <Input 
                type="number" 
                id='regularPrice' 
                min='1' 
                max='10' 
                value={listing.regularPrice} 
                onChange={handleChange} 
                className='p-2 border border-gray-300 rounded-lg text-sm'
                required
              />
              <p className='text-sm'>Regular Price
              <span>($/Month)</span></p>
            </div>
            <div className='flex items-center gap-2'>
              <Input 
                type="number" 
                id='bathrooms' 
                min='1' 
                max='10' 
                value={listing.bathrooms} 
                onChange={handleChange} 
                className='p-2 border border-gray-300 rounded-lg text-sm'
                required
              />
              <p className='text-sm'>Baths</p>
            </div>
           
            <div className='flex items-center gap-2'>
              <Input 
                type="number" 
                id='discountedPrice' 
                min='1' 
                max='10' 
                onChange={handleChange} 
                className='p-2 border border-gray-300 rounded-lg text-sm'
                required
              />
              <p className='text-sm'>Discounted Price
              <span>($/Month)</span></p>
            </div>
            
            <Input 
              type="number" 
              id='latitude' 
              placeholder='Latitude' 
              value={listing.latitude} 
              onChange={handleChange} 
              className='p-2 border border-gray-300 rounded-lg w-full text-sm' 
              required
            />

            <Input 
              type="number" 
              id='longitude' 
              placeholder='Longitude' 
              value={listing.longitude} 
              onChange={handleChange} 
              className='p-2 border border-gray-300 rounded-lg w-full text-sm' 
              required
            />
          </div>
          
        <form className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-4 '>
        <p className='font-semibold'>Images:
        <span>The first image will be the cover(max 6)</span>
        </p>
        <div className='flex flex-1 '>
        <input className='p-3 border-gray-300 rounded w-full' type="file" id='image'accept='image/*' multiple />
        <button className='p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
        </div>
        </div>
        </form>
        <div className='flex flex-col md:flex-row gap-4 '>
        <button className='p-3  text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
        onClick={handleLocation}
        >Use Current Location</button>
      </div>
          <div className='mt-6 h-80'>
            <MapContainer 
              center={[listing.latitude || 51.505, listing.longitude || -0.09]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
        
          <button className='p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Create Listing</button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
