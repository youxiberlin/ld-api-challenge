const port = process.env.PORT || 3000;
const mongodb = {
	host: process.env.MONGODB_HOST || 'localhost',
	port: process.env.MONGODB_PORT || 27017,
	db: 'ld-api',
};
const mongoRoute = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.db}`

module.exports = { port, mongoRoute };