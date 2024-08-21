const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Database/connection');
const cookieParser = require('cookie-parser');
const userRoute = require('./Route/userRoute/userRoutes.js');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '.env') });
const __dirname = path.resolve();
const app = express();

app.use(express.json()); 

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/user', userRoute);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
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
