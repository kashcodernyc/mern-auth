const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const connectDb= require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');

//database connection
connectDb()

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))



// routes
app.use('/api/goals', goalRoutes )
app.use('/api/users', userRoutes )
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});