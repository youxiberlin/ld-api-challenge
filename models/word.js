const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const wordSchema = new Schema({
	word: { type: String },
});
const Word = mongoose.model('Word', wordSchema)

module.exports = Word;