const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((con) => {
            console.log(`Mongoose Database connected with Host: ${con.connection.host}`)
        })
        .catch((error) => console.error("MongoDB connection failed:", error.message))
    mongoose.connection.on('error', (err) => {
        console.log(`DB connection error`)
    })
}


export default connectDatabase;