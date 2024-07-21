import React from 'react';
import {FaSearch}from 'react-icons/fa'
import logo from '../assets/logo.png'; // Adjust the path to your logo file
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import {Link} from 'react-router-dom';

const CursiveTypography = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 'bold',
});

function Header() {
  return (
    <header className='bg-slate-500 shadow-md p-4'>
      <div className='flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto'>
        <div className='flex items-center'>
          <img src={logo} alt='Real Estate Logo' className='h-12 w-12 mr-2' />
        
          
          <Box display="flex" flexWrap="wrap">
            <CursiveTypography variant="h4" component="span" sx={{ color: 'cornsilk' }}>
              Real
            </CursiveTypography>
            <CursiveTypography variant="h4" component="span" sx={{ color: 'black' }}>
              Estate
            </CursiveTypography>
          </Box>
        </div>
        <form className="bg-slate-300 p-2 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64 flex-grow text-slate-700 placeholder-slate-600"
        />
        <div className="ml-3 text-slate-600">
          <FaSearch />
        </div>
      </form>
<ul className='flex gap-4'>
<Link to = '/Home'>
 <li className ='hidden sm:inline text-slate-900 hover:underline'>Home</li> </Link>
<Link to ='/About'><li className ='hidden sm:inline  text-slate-900 hover:underline'>About</li></Link>
<Link to='/signin'>
<li className ='hidden sm:inline  text-slate-900 hover:underline'>SignIn</li></Link>
</ul>
      </div>
    </header>
  );
}

export default Header;
