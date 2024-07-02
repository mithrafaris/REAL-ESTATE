const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();
//app.use('/user', userRoute);
//app.use('/admin',adminRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
