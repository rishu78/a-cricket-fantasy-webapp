const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rishabh782818:j4lWoeH3vZhoKUg6@fantasy-app-db.stlirrp.mongodb.net/?retryWrites=true&w=majority&appName=fantasy-app-db');

const User = require('./models/userModel');

async function insert()
{
    await User.create({
        name: 'Rishabh Rathore',
        email: 'rishabh140302@gmail.com'
    });
}
insert();

http.listen(3000, function(){
    console.log('Server is running');
});