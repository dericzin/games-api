const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: String,
    year: Number,
    price: Number,
});


const Game = mongoose.model("Game", gameSchema);  


module.exports = Game;