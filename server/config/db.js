const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`DB connection successful`)
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}


module.exports = connectDb;