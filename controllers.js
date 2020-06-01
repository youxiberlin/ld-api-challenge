const Decimal = require('decimal.js');
const Word = require('./models/word');
const { formatSentence, splitToWords, splitToSentences } = require('./services/formatters');
const { countNumOfNonLexicalWords, countChars, countWords } = require('./services/helpers');
const { inputLimit } = require('./config');

let wordsPool;

const calculateLd = (inputText, nlWordsList) => {
	const inputWordsArr = splitToWords(formatSentence(inputText.toLowerCase()));
	const numOfNonLexicalWords = countNumOfNonLexicalWords(inputWordsArr, nlWordsList);
	const overall_ld = new Decimal(numOfNonLexicalWords / inputWordsArr.length)
	const fixedLd = overall_ld.toFixed(2);
	return fixedLd;
};

const isInvalid = (inputText) => {
	const numOfWords = countWords(inputText);
	const numOfChars = countChars(inputText);
	return numOfWords > inputLimit.words || numOfChars > inputLimit.chars;
};

const checkComplexity = async (req, res) => {
	if (isInvalid(req.body.text)) {
		res.status(400).send({
			status: 400, 
			message: 'Input text exceeds the limit: 100 words or 1000 characters'
		});
	} else {
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
	}
};

module.exports = {
	checkComplexity,
};
