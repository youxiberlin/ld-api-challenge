const formatSentence = sentence => sentence.replace(/[., ]+/g, " ").trim();
const splitToWords = sentence => sentence.split(' ');
const splitToSentences = texts => texts.trim().split('.').filter(Boolean);

module.exports = {
	formatSentence,
	splitToWords,
	splitToSentences
};
