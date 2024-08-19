import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png'; 
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CursiveTypography = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 'bold',
});

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]); // Use the location object

  return (
    <header className="bg-slate-500 shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center mb-4 sm:mb-0">
          <img src={logo} alt="Real Estate Logo" className="h-12 w-12 mr-2" />
          <Box display="flex" flexWrap="wrap">
            <CursiveTypography variant="h4" component="span" sx={{ color: 'cornsilk' }}>
              Real
            </CursiveTypography>
            <CursiveTypography variant="h4" component="span" sx={{ color: 'black' }}>
              Estate
            </CursiveTypography>
          </Box>
        </div>
        <form onSubmit={handleSubmit} 
          className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-full sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="ml-3 text-slate-600">
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-900 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-900 hover:underline">About</li>
          </Link>
          {currentUser && (
            <Link to="/create-listing">
              <li className="text-slate-900 hover:underline">New Post</li>
            </Link>
          )}
          {currentUser ? (
            <Link to="/profile">
              <img src={currentUser.avatar} alt="profile" className="h-8 w-8 rounded-full object-cover" />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-900 hover:underline">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
