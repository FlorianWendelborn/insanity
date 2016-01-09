var machine = require('./machine.json');
var fs = require('fs');

var program = '';

function append (text) {
	text = text || '';
	program += text + '\n';
}
function a (text) {
	text = text || '';
	program += text;
}
function alias (name, commands) {
	program += 'alias ' + name + ' "' + commands + '"\n';
}

append('// basic functionality');
alias('move-left', '');
alias('move-right', '');

alias('state-halt', 'print')

append(); // begin memory

append('// ' + machine.memory + ' bit memory');
var printMemory = '';
for (var i = 0; i < machine.memory; i++) {
	var memoryId = 'm-' + i;
	var currentData = machine.data.length >= i ? machine.data[i] : 0;
	a('alias ' + memoryId + ' ' + memoryId + '-is-' + currentData + '; '); // set bit
	a('alias ' + memoryId + '-is-0 ""; '); // branch: is-false
	a('alias ' + memoryId + '-is-1 ""; '); // branch: is-true
	a('alias ' + memoryId + '-set-0 "alias ' + memoryId + ' ' + memoryId + '-0"; '); // set-to: 0
	a('alias ' + memoryId + '-set-1 "alias ' + memoryId + ' ' + memoryId + '-1"; '); // set-to: 1

	// print memory content
	var prefix = 'print-' + i;

	// alias memory branches to print their value
	a('alias ' + prefix + ' "alias ' + memoryId + '-is-0 ' + prefix + '-is-0; alias ' + memoryId + '-is-1 ' + prefix + '-is-1; ' + memoryId + '"; ');

	// print functions
	a('alias ' + prefix + '-is-0 "exec memory-' + i + '-is-0"; ');
	a('alias ' + prefix + '-is-1 "exec memory-' + i + '-is-1"; ');

	append();

	// append to print-all
	printMemory += 'print-' + i + '; ';
}

append(); // begin print

append('// print');
alias('print', printMemory);

append(); // begin states

var keys = Object.keys(machine.states);
append('// ' + keys.length + ' states');

for (var i = 0; i < keys.length; i++) {
	append();
}

// append(); // finalize
append('print');

console.log(program);
fs.writeFileSync('./compiled.cfg', program);
