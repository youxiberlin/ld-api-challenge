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
	const isVerbose = req => req.query.mode === 'verbose';

	if (!wordsPool) {
		const wordsDocs = await Word.find({});
		const wordsList = wordsDocs.map(doc => doc.word);
		wordsPool = wordsList;
	}

	const overall_ld = calculateLd(req.body.text, wordsPool);

	if (isVerbose(req)) {
		const inputSentences = splitToSentences(req.body.text);
		const ldArray = inputSentences.map(sentence => calculateLd(sentence, wordsPool));
		
		res.send({
			data: {
				sentence_ld: ldArray,
				overall_ld
			}
		})
	} else {
		res.send({
			data: {
				overall_ld,
			}
		});
	}
};

module.exports = {
	checkComplexity,
};
