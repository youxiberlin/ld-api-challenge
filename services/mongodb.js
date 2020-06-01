const mongoose = require('mongoose');
const logger = require('./logger');

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

module.exports = { initializeMongoDB };