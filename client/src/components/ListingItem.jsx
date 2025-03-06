import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrl[1]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="p-3">
          <p className="truncate text-lg font-semibold">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-5 w-5 text-green-700" />
            <p className="text-sm text-gray-900 truncate w-full">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-900 line-clamp-2">{listing.description}</p>
          <p className="mt-2  text-gray-900 font-semibold">
          $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-IN')
              : listing.regularPrice.toLocaleString('en-IN')}
              {listing.type === 'rent'&&'/month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
          <div className=''>
          {listing.bedroom>1?`${listing.bedrooms}beds`:`${listing.bedrooms}bed`}
          </div>
          <div className=''>
          {listing.bathroom>1?`${listing.bathrooms}baths`:`${listing.bedrooms}bath`}
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
