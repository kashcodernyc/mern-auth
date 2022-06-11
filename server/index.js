const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const connection = require('./db');
const { errorHandler } = require('./middleware/errorMiddleware');
const goalRoutes = require('./routes/goalRoutes');

//database connection
connection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))



// routes
app.use('/api/goals', goalRoutes )
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});