import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import cartbg from '../../assets/cartbg.jpg';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import google from '../../assets/google.png';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const CursiveTypography = styled(Typography)({
  fontFamily: 'cursive',
  fontWeight: 'bold',
});

function SignUp() {
  const [formData, setFormData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleState = () => {
    setIsShow(!isShow);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast('Successfully created your account', {
          icon: '👏',
        });
        navigate('/SignIn');
      } else {
        toast.error(data.message || 'Sign-up failed.');
      }
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen p-4 md:p-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${cartbg})`,
        filter: 'brightness(100%)',
      }}
    >
      <div className="w-full max-w-md border p-6 md:p-9 rounded-lg shadow-lg">
        <div className="text-center">
          <img src={logo} className="w-20 h-20 mx-auto" alt="Logo" />
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
            <div className="relative">
              <input
                id="password"
                type={isShow ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                className="w-full py-1 my-1 bg-transparent border-b border-black outline-none focus:outline-none text-black placeholder-black"
              />
              <div onClick={toggleState} className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
                {isShow ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full my-1 py-2 text-white font-semibold bg-slate-900 rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-60"
            >
              {loading ? 'Loading....' : 'Sign Up'}
            </button>
          </form>
          <div className="flex gap-2 justify-between mt-5">
            <div>
              Have an account?
              <Link to="/signin">
                <span className="text-blue-700"> Sign In</span>
              </Link>
            </div>
            <a className="text-sm underline-offset-2 text-gray-900 font-medium cursor-pointer">
              Forgot Password?
            </a>
          </div>
          <div className="w-full flex items-center justify-center my-4">
            <p className="text-lg text-white/80">or</p>
          </div>
          <button className="w-full my-7 py-2 text-black bg-white font-semibold rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-80">
            <img src={google} className="h-6 mr-2" alt="Google Icon" />
            Sign In with Google
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUp;
