const countNumOfNonLexicalWords = (input, list) => {
	let counter = 0;
	input.forEach(word => {
		if (list.includes(word)) counter++;
	});
	return counter
};

const countChars = (str) => {
	const re = /[a-z]/gi;
	return ((str || '').match(re) || []).length;
};

const countWords = (str) => {
	const re = /[a-z]\w+/gi;
	return ((str || '').match(re) || []).length;
};

module.exports = {
	countNumOfNonLexicalWords,
	countChars,
	countWords
}