import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Input, Button, IconButton, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

// Fix for Leaflet marker icons not appearing correctly in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 100,
    discountPrice:'',
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    type: 'sale',
    latitude: '',
    longitude: '',
    offer: false,
    imageUrl: [],
  });

  const [files, setFiles] = useState([]);
  const [ImageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState(false)
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
  
    
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/user/getlisting/${listingId}`);
      const data = await res.json();
      console.log(data);
      
      if (data.success === false) {
        console.log(data.message);
        console.log(listingId);
        return;
      }
      setFormData((prevState) => ({
        ...prevState,
        ...data,
      }));
    };
    fetchListing();
  }, [params.listingId]);
  



  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrl.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      
      setLoading(true);
      setError(false);
  
      const res = await fetch(`/user/updated/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          offer: formData.offer || false,
        }),
      });
      
      const data = await res.json();
      setLoading(false);
  
      if (!data.success) {
        return setError(data.message);
      }
  
      // Navigate to the listing page after successful update
      navigate(`/user/${data._id}`);
  
    } catch (error) {
      setError('Failed to update listing');
      setLoading(false);
    }
  };
  

  const handleImageSubmit = (e) => {
    e.preventDefault();

    if (files.length > 0) {
      if (files.length + formData.imageUrl.length < 7) {
        if (files.length >= 3) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({ ...formData, imageUrl: formData.imageUrl.concat(urls) });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (2MB max per image)');
              setUploading(false);
            });
        } else {
          setImageUploadError('You must upload at least 3 images per listing');
          setUploading(false);
        }
      } else {
        setImageUploadError('You can only upload up to 6 images per listing');
        setUploading(false);
      }
    } else {
      setImageUploadError('No images selected');
      setUploading(false);
    }
  };


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setFormData((prevState) => ({
          ...prevState,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });

    useEffect(() => {
      if (formData.latitude && formData.longitude) {
        map.setView([formData.latitude, formData.longitude], map.getZoom());
      }
    }, [formData.latitude, formData.longitude, map]);

    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  }

  const handleDeleteImage = (url) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((i) => i !== url),
    });
  };
console.log(formData);
  return (
    <div>
      <Header />
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Update Listing</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Name"
              className="border p-2 rounded-lg w-full text-sm"
              id="name"
              value={formData.name}
              onChange={handleChange}
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              placeholder="Description"
              className="border p-2 rounded-lg h-20 md:h-auto w-full text-sm"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              placeholder="Address"
              className="border p-2 rounded-lg w-full text-sm"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-4 h-4"
                  checked={formData.type === 'sale'}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      type: formData.type === 'sale' ? '' : 'sale',
                    })
                  }
                />
                <span className="text-sm">Sell</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4 h-4"
                  checked={formData.type === 'rent'}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      type: formData.type === 'rent' ? '' : 'rent',
                    })
                  }
                />
                <span className="text-sm">Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4 h-4"
                  checked={formData.parking}
                  onChange={handleChange}
                />
                <span className="text-sm">Parking spot</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4"
                  checked={formData.furnished}
                  onChange={handleChange}
                />
                <span className="text-sm">Furnished</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4"
                  checked={formData.offer}
                  onChange={handleChange}
                />
                <span className="text-sm">Offer</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                value={formData.bedrooms}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <p className="text-sm">Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="regularPrice"
                min="1"
                value={formData.regularPrice}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <p className="text-sm">
                Regular Price 
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                value={formData.bathrooms}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <p className="text-sm">Baths</p>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  id="discountPrice"
                  value={formData. discountPrice}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                 
                />
                <p className="text-sm">
                   discountPrice 
                </p>
              </div>
            )}

            <Input
              type="number"
              id="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full text-sm"
              required
            />

            <Input
              type="number"
              id="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-semibold">
                Images: <span>The first image will be the cover (max 6)</span>
              </p>
              <div className="flex gap-4 items-center">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded w-full"
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                />
                <Button onClick={handleImageSubmit} 
                variant="outlined" 
                disabled={uploading}
                color="success">
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {ImageUploadError && (
                <p className="text-red-700">{ImageUploadError}</p>
              )}
              {formData.imageUrl.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 mt-4">
                  {formData.imageUrl.map((url,index) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt="listing image"
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <IconButton
                        className="absolute top-0 right-0"
                        onClick={() => handleDeleteImage(url)}
                      >
                        <DeleteIcon className="text-red-700" />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Box>
  <Button variant="outlined" color="primary" onClick={handleLocation}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
    </svg>
  </Button>
</Box>


          <div className="mt-6 h-80 w-full">
            <MapContainer
              center={[formData.latitude || 51.505, formData.longitude || -0.09]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className="mt-6">
            <Button disabled={loading||uploading} type="submit" variant="outlined" color="success">
            {loading ? 'Updateing...' : 'Update listing'}
            </Button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
