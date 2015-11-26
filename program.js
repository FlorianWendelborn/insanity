// require
var fs = require('fs');
var memory = require('./memory');
var input = require('./input');
var utils = require('./utils');
var instructions = require('./instructions');

// initialize
var program = '';

function append (s) {
	if (s) program += s;
	program += '\n';
}

// assemble
append(memory.generate({
	size: 4,
	compact: true
}));

append(input.generate(['KP_0', 'KP_1']));

append(instructions.parse([

]));

append(utils.run);

// write
fs.writeFileSync('program.cfg', program);
