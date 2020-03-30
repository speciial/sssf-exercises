const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    speciesName: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" }
});

module.exports = mongoose.model("Species", SpeciesSchema);
