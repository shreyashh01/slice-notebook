const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/Slice"

const connectToMongo = () => {
    mongoose.connect(mongoURI);
        console.log("connection done")
}


module.exports = connectToMongo;