'use strict';

var arykow_iframely_client = require('../lib/arykow-iframely-client.js');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports['awesome'] = {
	setUp: function(done) {
		// setup here
		done();
	},
	'no args': function(test) {
		arykow_iframely_client('http://h16free.com/2013/12/08/26614-ne-partez-pas-on-est-si-bien-ici', function(err, result) {
			test.expect(2);
			test.equal(err, null);
			test.notEqual(result, null);
			test.done();
		});
	},
};
