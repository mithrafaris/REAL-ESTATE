import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import cartbg from '../../assets/cartbg.jpg';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import google from '../../assets/google.png';

const CursiveTypography = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 'bold',
});

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Sign-up successful!');
        setError(null);
      } else {
        setMessage(null);
        setError(data.message ||'Something went wrong!');
      }
    } catch (error) {
      setMessage(null);
      setError('Network error:Please try again later.');
    }
  };

  return (
    <div
      className='flex flex-col justify-center items-center min-h-screen p-4 md:p-10 bg-cover bg-center'
      style={{
        backgroundImage: `url(${cartbg})`,
        filter: 'brightness(100%)',
      }}
    >
      <div className="w-full max-w-md border p-6 md:p-9 rounded-lg shadow-lg">
        <div className="text-center">
          <img src={logo} className='w-20 h-20 mx-auto' alt='Logo' />
          <div className="flex justify-center mb-4 md:mb-6">
            <CursiveTypography variant="h4" component="span" sx={{ color: 'cornsilk' }}>
              Real
            </CursiveTypography>
            <CursiveTypography variant="h4" component="span" sx={{ color: 'black' }}>
              Estate
            </CursiveTypography>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col mb-4 md:mb-6">
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              className="w-full py-1 my-1 bg-transparent border-b border-black outline-none focus:outline-none text-black placeholder-black"
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full py-1 my-1 bg-transparent border-b border-black outline-none focus:outline-none text-black placeholder-black"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full py-1 my-1 bg-transparent border-b border-black outline-none focus:outline-none text-black placeholder-black"
            />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
            <button
              type="submit"
              className='w-full my-1 py-2 text-white font-semibold bg-slate-900 rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-60'
            >
              Login
            </button>
          </form>
          <div className='flex gap-2 justify-between mt-5'>
            <div>Have an account?
              <Link to="/SignUp">
                <span className='text-blue-700 gap-0'>Sign Up</span>
              </Link>
            </div>
            <a className='text-sm underline-offset-2 text-gray-900 font-medium cursor-pointer'>
              Forget Password?
            </a>
          </div>
          
          <div className='w-full flex items-center justify-center my-4'>
            <p className='text-lg text-white/80'>or</p>
          </div>
          <button className='w-full my-7 py-2 text-black bg-white font-semibold rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-80'>
            <img src={google} className='h-6 mr-2' alt="Google Icon" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
