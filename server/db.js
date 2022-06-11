const mongoose = require('mongoose');

module.exports = async() => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
    try{
        mongoose.connect(process.env.DB_URL, connectionParams);
        console.log("DB connection sucessful")

    }catch(err){
        console.log(err);
    }
}