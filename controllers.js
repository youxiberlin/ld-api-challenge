const Decimal = require('decimal.js');
const Word = require('./models/word');
const { formatSentence, splitToWords, splitToSentences } = require('./services/formatters');
const { countNumOfNonLexicalWords } = require('./services/helpers');

let wordsPool;

const calculateLd = (inputText, nlWordsList) => {
	const inputWordsArr = splitToWords(formatSentence(inputText));
	const numOfNonLexicalWords = countNumOfNonLexicalWords(inputWordsArr, nlWordsList);
	const overall_ld = new Decimal(numOfNonLexicalWords / inputWordsArr.length)
	const fixedLd = overall_ld.toFixed(2);
	return fixedLd;
};

const checkComplexity = async (req, res) => {
	if (!wordsPool) {
		const wordsDocs = await Word.find({});
		const wordsList = wordsDocs.map(doc => doc.word);
		wordsPool = wordsList;
	}

	const overall_ld = calculateLd(req.body.text, wordsPool);

	res.send({
		data: {
			overall_ld,
		}
	});
};

module.exports = {
	checkComplexity,
};
