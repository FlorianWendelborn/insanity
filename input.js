function generate (keys) {
	var text = '// Inputs:\n';
	for (var i = 0; i < keys.length; i++) {
		text += 'bind ' + keys[i] + ' i-' + i + '\n';
	}
	return text;
}

module.exports = {
	generate: generate
};
