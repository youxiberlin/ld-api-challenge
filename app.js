const express = require('express');
const bodyParser = require('body-parser');

const { initializeMongoDB, insertNonLexicalWords } = require('./services/mongodb');
const logger = require('./services/logger');
const { port, mongoRoute } = require('./config');
const { checkComplexity} = require('./controllers');
const nlwordsList = require('./services/nlwordsList');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/complexity', checkComplexity);
app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => logger.info(`App listening at port ${port}`));

initializeMongoDB(mongoRoute)
	.then(() => insertNonLexicalWords(nlwordsList));