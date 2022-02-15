const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appStoreSinhHuy', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost/appStoreSinhHuy`, {
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