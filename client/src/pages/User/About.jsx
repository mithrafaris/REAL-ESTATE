import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Header from '../../components/Header';

const customFontStyle = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Replace with your desired font
};

export default function About() {
  return (
    <div>
      <Header />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={customFontStyle}>
            About DreamLine
          </Typography>
          <Typography variant="body1" paragraph sx={customFontStyle}>
            At Dreamline, we are passionate about helping you find your dream home. As a top-tier real estate agency, we specialize in the buying and selling of residential and commercial properties in the most sought-after locations. Our dedicated team of professionals is committed to providing outstanding service and ensuring that your real estate journey is both enjoyable and successful.
          </Typography>
          <Typography variant="body1" paragraph sx={customFontStyle}>
            Our core mission is to guide you through every step of the real estate process with expert knowledge, personalized attention, and a thorough understanding of the market. Whether you're looking to purchase a new property, sell your current home, or invest in real estate, Dreamline is here to assist you in achieving your goals.
          </Typography>
          <Typography variant="body1" sx={customFontStyle}>
            With years of experience and a deep commitment to our clients, our team is dedicated to delivering exceptional results. We believe that finding or selling a property should be a rewarding and exciting experience, and we strive to make that happen for each and every client.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
