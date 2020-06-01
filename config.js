const port = process.env.PORT || 3000;
const mongodb = {
	host: process.env.MONGODB_HOST || 'localhost',
	port: process.env.MONGODB_PORT || 27017,
	db: 'ld-api',
};
const mongoRoute = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.db}`
const inputLimit = {
	words: 100,
	chars: 1000
};

module.exports = { port, mongoRoute, inputLimit };