import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import {Link} from 'react-router-dom'

const Contact = ({ listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/user/${listing.userRef}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOwner();
  }, [listing.userRef]);

  return (
    <>
      {owner && (
        <Draggable>
          <Card
            sx={{
              width: 350,
              height: 400,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: 2,
              padding: 2,
              boxShadow: 3,
              position: 'relative'
            }}
            className="border border-gray-300 rounded-lg shadow-lg p-4"
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginBottom: 1 }}
                className="text-gray-800 text-lg font-semibold mb-2"
              >
                Contact {owner.username} about
                <span className="font-semibold"> {listing.name.toLowerCase()}</span>
              </Typography>
              <TextField
                variant="outlined"
                multiline
                rows={2}
                value={message}
                onChange={handleChange}
                placeholder="Enter your message..."
                fullWidth
                sx={{ marginBottom: 2 }}
                className="border-gray-300"
              />
              <Link to={`mailto:${owner.email}?subject=Regarding${listing.name}&body=${message}`}>
              <Button
                variant="contained"
                color="success"
                onClick={() => console.log('Message sent:', message)}
                sx={{ width: '100%' }}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Send
              </Button>
              </Link>
            </CardContent>
          </Card>
        </Draggable>
      )}
    </>
  );
};

export default Contact;
