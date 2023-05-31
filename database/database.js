const mongoose = require("mongoose");

const mongoDBConnection = "mongodb+srv://admin:admin@gamesapi.wnudsgw.mongodb.net/"


const connectToMongoDB = () => {
    return mongoose.connect(mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true });
};


module.exports = connectToMongoDB
