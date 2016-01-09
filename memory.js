function generate (options) {
	var text = '// # Bits of Memory:\n'.replace(/#/g, options.size);
	var append = function (s) {
		text += s + '\n';
	}
	for (var i = 0; i < options.size; i++) {
		append('alias m-# m-#-0'.replace(/#/g, i));
		append('alias m-#-0 ""'.replace(/#/g, i));
		append('alias m-#-1 ""'.replace(/#/g, i));
		append('alias m-#-set-0 "alias m-# m-#-0"'.replace(/#/g, i));
		append('alias m-#-set-1 "alias m-# m-#-1"'.replace(/#/g, i));
		if (i < options.size-1) append('');
	}
	return text;
}

module.exports = {
	generate: generate
};
