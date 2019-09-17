const mongoose = require('mongoose');
const Schema = mongoose.Schema


const celebSchema = new Schema({

    name: String,
    occupation: String,
    catchPhrase: String

})



const celeb = mongoose.model('celebirties', celebSchema);




module.exports = celeb;
