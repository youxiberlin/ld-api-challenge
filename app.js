const express = require('express');
const bodyParser = require('body-parser');

const { initializeMongoDB } = require('./services/mongodb');
const logger = require('./services/logger');
const { port, mongoRoute } = require('./config');
const { checkComplexity } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/complexity', checkComplexity);
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => logger.info(`App listening at port ${port}`));

initializeMongoDB(mongoRoute)

module.exports = app;
