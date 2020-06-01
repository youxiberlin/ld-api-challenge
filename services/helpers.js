const countNumOfNonLexicalWords = (input, list) => {
	let counter = 0;
	input.forEach(word => {
		if (list.includes(word)) counter++;
	});
	return counter
};

module.exports = {
	countNumOfNonLexicalWords
}