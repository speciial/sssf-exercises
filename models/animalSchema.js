const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    animalName: String,
    species: {type: Schema.Types.ObjectId, ref: "Species"}
});

module.exports = mongoose.model("Animal", AnimalSchema);