const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://sinh:${process.env.PASSWORD}@web.oo2bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connected`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;