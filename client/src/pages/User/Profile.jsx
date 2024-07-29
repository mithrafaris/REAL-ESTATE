import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update');
      }
      dispatch(updateUserSuccess(data));
      toast.success('Update successful', {
        icon: '👏',
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <Header />
      <Toaster />
      <div className="p-2 max-w-lg mx-auto bg-transparent rounded-lg">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover mx-auto cursor-pointer"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">Error uploading image</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        {error && <p className="text-red-700 text-center mt-4">{error}</p>}
        <div className="flex justify-between mt-4">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
