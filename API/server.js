const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const userRoute = require('./Route/userRoute/user.route.js');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/user', userRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
