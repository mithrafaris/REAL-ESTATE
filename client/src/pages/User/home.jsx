import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../../components/ListingItem';

function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?offer=true&limit=3'); // Adjust URL as needed
        const data = await res.json();
        setOfferListing(data);
      } catch (error) {
        console.error('Error fetching offer listings:', error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?type=rent&limit=3'); // Adjust URL as needed
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.error('Error fetching rent listings:', error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?type=sale&limit=3'); // Adjust URL as needed
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.error('Error fetching sale listings:', error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6 md:px-6 lg:px-12">
      <div className="text-center">
        <Typography variant="h2" component="h1" gutterBottom className="font-bold text-gray-800 text-xl md:text-2xl lg:text-3xl">
          Your <span className="text-green-600">dream home</span> is just a click away!
          <br />
          Where your story begins.
        </Typography>
        <Typography variant="body1" className="text-gray-600 mt-3 text-xs md:text-sm lg:text-base">
          DreamLine builders is your gateway to finding the perfect home.
          <br />
          Choose from a vast collection of properties tailored to meet your needs.
        </Typography>
        <Link to="/Search" className="text-blue-500 underline mt-3 inline-block text-xs md:text-sm lg:text-base">
          Let's get started...
        </Link>
      </div>
    </div>
    
      <div className="my-8 px-4 md:px-8 lg:px-16">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
        >
          {offerListing && offerListing.length > 0 && offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: 'cover'
                }}
                className="h-[300px] md:h-[400px] lg:h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListing && offerListing.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-xs md:text-sm lg:text-base text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {offerListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListing && rentListing.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-xs md:text-sm lg:text-base text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {rentListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListing && saleListing.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-xs md:text-sm lg:text-base text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {saleListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
