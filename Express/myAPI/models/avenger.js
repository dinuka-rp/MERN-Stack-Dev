const mongoose = require("mongoose");       //importing mongoose

const avengerSchema = new mongoose.Schema({
    name:{                  //schema validations
        type: String,
        required: true,         // Not Null
        minlength: 4,
        maxlength: 20
    },
    birthname: String,
    movies: {
        type: [String],
        required: true,
        enum: ["Infinity War","Endgame","Iron Man 2", "First Avenger"]
    },           //String Array for movies
    imgUrl: {
        type: String,
        default: "https://www.imdb.com/title/tt4154796/mediaviewer/rm2775147008"
    },
    likeCount: Number,
    deceased: Boolean
});

const Avenger = mongoose.model("Avenger", avengerSchema);

module.exports = Avenger;