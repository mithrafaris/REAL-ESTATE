
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import cartbg from '../../assets/cartbg.jpg';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import OAuth from '../../components/OAuth';

const CursiveTypography = styled(Typography)({
  fontFamily: 'fantasy',
  fontWeight: 'bold',
});

function SignIn() {
  const [formData, setFormData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);

  const toggleState = () => {
    setIsShow(!isShow);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success('Login successful', {
          icon: '👏',
        });
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message || 'Sign-in failed.');
      }
    } catch (error) {
      dispatch(signInFailure('Something went wrong'));
      toast.error('Something went wrong');
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
            <CursiveTypography variant="h4" component="span" sx={{ color: 'white' }}>
              Dream
            </CursiveTypography>
            <CursiveTypography variant="h4" component="span" sx={{ color: 'black' }}>
              Line
            </CursiveTypography>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col mb-4 md:mb-6">
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
              {loading ? 'Loading....' : 'Login'}
            </button>
          </form>
          <div className="flex gap-2 justify-between mt-5">
            <div>
              Don't have an account?
              <Link to="/sign-up">
                <span className="text-red-900"> Sign Up</span>
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-center my-4">
            <p className="text-lg text-white/80">or</p>
          </div>
         <OAuth/>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SignIn;
