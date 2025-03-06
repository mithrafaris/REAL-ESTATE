import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import real from '../../assets/real.jpg'
import home from '../../assets/home.jpeg'
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
    <div className='bg-white'>
      <Header />
      <div className="mx-auto w-full bg-white max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16 sm:block hidden">
      <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
              <h2 className="text-5xl font-serif sm:text-5xl">
                  Your <span className="text-blue-900">dream home </span>
                  is just a click away!
                  <span className="hidden sm:block text-3xl">
                      <br />
                      Where your story begins.....
                  </span>
              </h2>
          </div>
      </div>
  
      <div className="absolute inset-0 w-full sm:my-10 sm:pt-1 pt-12 h-full">
          <img className="w-96 h-96" src={home} alt="image1" />
      </div>
  </aside>
  

          <div className="grid  place-items-center sm:mt-20">
              <img className="sm:w-100 w-50" src={real} alt="image2" />
          </div>

          <h1 className="text-center text-2xl sm:text-4xl py-10 font-serif">" DreamLine is your gateway to finding the perfect home!"
          <br/>
          <Link
          to="/About"
          className="text-blue-900 text-xl"
        >

          Learn more...
        </Link>
        </h1>
      </div>
    
      <div className="my-8 bg-white px-4 md:px-8 lg:px-16">
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
        <div className='max-w-6xl mx-auto  p-3 flex flex-col gap-8 my-10'>
          {offerListing && offerListing.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-serif text-slate-900'>Recent offers</h2>
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
                <h2 className='text-xl md:text-2xl lg:text-3xl font-serif text-slate-900'>Recent places for rent</h2>
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
              <div className='my-3 bg'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-serif text-slate-900'>Recent places for sale</h2>
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
