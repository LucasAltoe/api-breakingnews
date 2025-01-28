const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('Wait connecting to the database');

    mongoose.connect("mongodb+srv://lucasgalc:root@cluster0.ftkzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB Atlas Connected!'))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;