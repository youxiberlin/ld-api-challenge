const mongoose = require('mongoose');
const logger = require('./logger');
const Word = require('../models/word');

const connect = (mongoRoute) => mongoose.connect(mongoRoute, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

const initializeMongoDB = (mongoRoute) => {
	mongoose.connection.on('connected', () => logger.info(`connected to ${mongoRoute}`));
	mongoose.connection.on('error', () => logger.error(`mongoDB connection error`));
	mongoose.connection.on('disconnected', () => logger.warn(`mongoDB is disconnected`));
	return connect(mongoRoute);
};

const insertNonLexicalWords = (words) => {
	const makeObj = arr => arr.map(word => {
		const obj = {};
		obj['word'] = word;
		return obj;
	});

	Word.insertMany(makeObj(words), (error, docs) => {
		if (error) logger.error('mongoDB could not insert non lexical words');
		else logger.info(`mongoDB successfully inserted ${docs.length} initial lexical words`);
	})
};

module.exports = { initializeMongoDB, insertNonLexicalWords };