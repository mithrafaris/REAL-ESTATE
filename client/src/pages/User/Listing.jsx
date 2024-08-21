import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';

import 'leaflet/dist/leaflet.css';
import Contact from '../../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/user/getlisting/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8 px-4 relative"> 
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl text-red-600">Something went wrong!</p>
        )}
        {listing && !loading && !error && (
          <div>
            <Swiper navigation>
              {listing.imageUrl.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border border-red-500 rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-red-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 border border-green-900 text-green-900">
                Link copied!
              </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} - ${' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-IN')
                  : listing.regularPrice.toLocaleString('en-IN')}
                {listing.type === 'rent' && ' / month'}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                <FaMapMarkerAlt className="text-blue-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="border border-red-900 w-full max-w-[200px] text-red-900 text-center hover:cursor-pointer p-1 rounded-md">
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className="border border-green-900 w-full max-w-[200px] text-green-900 text-center hover:cursor-pointer p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <ul className="text-blue-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaChair className="text-lg" />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>
              <div className="relative z-0"> {/* Ensure the map is below the chat */}
                {listing.latitude && listing.longitude && (
                  <MapContainer
                    center={[listing.latitude, listing.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-[400px] w-full rounded-md mt-6"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[listing.latitude, listing.longitude]}>
                      <Popup>
                        {listing.name} <br /> {listing.address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
              <div>
      {currentUser && listing.userRef !== currentUser._id && (
        <IconButton
          color="primary"
          onClick={() => setContact(!contact)} 
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1300,
          }}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      )}
      {contact && (
        <div style={{ position: 'fixed', bottom: 100, right: 16, zIndex: 1300 }}>
          <Contact listing={listing} />
        </div>
      )}
    </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
