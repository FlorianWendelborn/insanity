function generate (amount) {
	var text = '// # Bits of Memory:\n'.replace(/#/g, amount);
	var append = function (s) {
		text += s + '\n';
	}
	for (var i = 0; i < amount; i++) {
		append('alias m-# m-#-0'.replace(/#/g, i));
		append('alias m-#-0 ""'.replace(/#/g, i));
		append('alias m-#-1 ""'.replace(/#/g, i));
		if (i < amount-1) append('');
	}
	return text;
}

module.exports = {
	generate: generate
};
