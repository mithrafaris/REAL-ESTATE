import React from 'react';
import google from '../assets/google.png';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/user/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      });

      const data = await res.json();
      //console.log(data);

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        console.error('Google sign-in failed', data);
      }
    } catch (error) {
      console.error('Could not sign in with Google', error);
    }
  };

  return (
    <button onClick={handleGoogleClick} type='button' className="w-full my-7 py-2 text-black bg-white font-semibold rounded-md text-center flex items-center justify-center uppercase hover:opacity-75 disabled:opacity-80">
      <img src={google} className="h-6 mr-2" alt="Google Icon" />
      Sign In with Google
    </button>
  );
}

export default OAuth;
