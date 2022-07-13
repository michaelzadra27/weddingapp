require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dcteqhlcf",
    api_key: "635153873816949",
    api_secret: "KqkykPYcKAw3_WZN5r8JrMBKkBM",
    
});

module.exports =  {cloudinary} ;