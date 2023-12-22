const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    genre:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
    },
    review:[{
        user:{
            type:String,
        },
        text:{
            type:String,
        },
        rating:{
            type:Number,
        }
    }]
})

const Movies = mongoose.model('Movies',moviesSchema);
module.exports = Movies;