import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    setSidebardata({
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl || 'all',
      parking: parkingFromUrl === 'true',
      furnished: furnishedFromUrl === 'true',
      offer: offerFromUrl === 'true',
      sort: sortFromUrl || 'created_at',
      order: orderFromUrl || 'desc',
    });

    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/user/search?${searchQuery}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    setSidebardata(prev => {
      if (id === 'searchTerm') {
        return { ...prev, searchTerm: value };
      } 
      if (id === 'sort_order') {
        const [sort, order] = value.split('_');
        return { ...prev, sort: sort || 'created_at', order: order || 'desc' };
      }
      if (type === 'radio') {
        return { ...prev, type: id.replace('type', '').toLowerCase() };
      }
      if (type === 'checkbox') {
        return { ...prev, [id]: checked };
      }
      return prev;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebardata);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <Fragment>
      <Header />
      <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            {/* Search Term Input */}
            <div className='flex items-center gap-2'>
              <label htmlFor='searchTerm'>Search Term:</label>
              <input 
                type="text"
                id='searchTerm'
                placeholder="Search..."
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            {/* Type Selection */}
            <div className='flex gap-2 flex-wrap items-center'>
              <label>Type:</label>
              <div className='flex gap-2'>
                <input 
                  type='radio' 
                  id='typeAll'
                  name='type'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                />
                <span>All</span>
              </div>
              <div className='flex gap-2'>
                <input 
                  type='radio' 
                  id='typeRent'
                  name='type'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input 
                  type='radio' 
                  id='typeSale'
                  name='type'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                />
                <span>Sale</span>
              </div>
            </div>

            {/* Amenities Selection */}
            <div className='flex gap-2 flex-wrap items-center'>
              <label>Amenities:</label>
              <div className='flex gap-2'>
                <input 
                  type='checkbox' 
                  id='parking'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className='flex gap-2'>
                <input 
                  type='checkbox' 
                  id='furnished'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input 
                  type='checkbox' 
                  id='offer'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span>Offer</span>
              </div>
            </div>

            {/* Sort Options */}
            <div className='flex items-center gap-2'>
              <label htmlFor='sort_order'>Sort:</label>
              <select 
                id='sort_order' 
                className='border rounded-lg p-3'
                value={`${sidebardata.sort}_${sidebardata.order}`}
                onChange={handleChange}
              >
                <option value='regularPrice_desc'>Price High to Low</option>
                <option value='regularPrice_asc'>Price Low to High</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
              </select>
            </div>
          
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Search
            </button>
          </form>
        </div>

        {/* Listing Results */}
        <div className="p-7 flex-grow">
          <h1>Listing Results:</h1>
          {loading ? (
            <p>Loading...</p>
          ) : listings.length > 0 ? (
            <div>
              {/* Map through listings and display them */}
              {listings.map(listing => (
                <div key={listing._id} className='border p-4 mb-4 rounded'>
                  <h2>{listing.name}</h2>
                  <p>{listing.description}</p>
                  <p>{listing.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No listings found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Search;
