const mongoose = require('mongoose');


const mongoConnect = () => {

    mongoose.connect('mongodb://localhost:27017/test').then(
        res => {
            console.log('Successfully connected to database');
        }
    ).catch(err => {
        console.log('connection failed to database');
    })
}

export default {
    mongoConnect
}