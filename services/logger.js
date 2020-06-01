const log4js = require('log4js');

log4js.configure({
	appenders: { out: { type: 'stdout', layout: { type: 'colored' } } },
	categories: { default: { appenders: ['out'], level: 'info' } }
});

const logger = log4js.getLogger('ld-api');

module.exports = logger;