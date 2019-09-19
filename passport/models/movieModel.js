const mongoose = require('mongoose');
const Schema = mongoose.Schema


const movieSchema = new Schema({

    title: String,
    director: String,
    actors: {type: Schema.Types.ObjectId, ref: 'celebs'},


})



const movie = mongoose.model('movies', movieSchema);




module.exports = movie;
