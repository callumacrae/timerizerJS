var should = require('should');
var Timerizer = require('../timerizer');

describe('timerizerJS', function () {

	it('should handle seconds ago using the constructor', function () {
		var tenSecondsAgo = Timerizer(10).seconds.ago();

		tenSecondsAgo.should.be.an.instanceOf(Date);
		tenSecondsAgo.getTime().should.be.approximately(Date.now() - 1e4, 10);
	});

	it('should handle seconds ago on numbers', function () {
		var fiveSecondsAgo = (5).seconds.ago();

		fiveSecondsAgo.should.be.an.instanceOf(Date);
		fiveSecondsAgo.getTime().should.be.approximately(Date.now() - 5e3, 10)
	});

	it('should handle hours ago from constructor', function () {
		var time = new Timerizer(2).hours.ago().getTime();
		time.should.be.approximately(Date.now() - 72e5, 10);
	});

	it('should handle hours ago', function () {
		var time = (2).hours.ago().getTime();
		time.should.be.approximately(Date.now() - 72e5, 10);
	});

	it('should handle singular hours ago', function () {
		var time = (1).hour.ago().getTime();
		time.should.be.approximately(Date.now() - 36e5, 10);
	});

	it('should handle seconds from now using the constructor', function () {
		var tenSecondsAgo = Timerizer(10).seconds.fromNow();

		tenSecondsAgo.should.be.an.instanceOf(Date);
		tenSecondsAgo.getTime().should.be.approximately(Date.now() + 1e4, 10);
	});

	it('should handle seconds from now on numbers', function () {
		var fiveSecondsAgo = (5).seconds.fromNow();

		fiveSecondsAgo.should.be.an.instanceOf(Date);
		fiveSecondsAgo.getTime().should.be.approximately(Date.now() + 5e3, 10)
	});

	it('should handle hours from now from constructor', function () {
		var time = new Timerizer(2).hours.fromNow().getTime();
		time.should.be.approximately(Date.now() + 72e5, 10);
	});

	it('should handle hours from now', function () {
		var time = (2).hours.fromNow().getTime();
		time.should.be.approximately(Date.now() + 72e5, 10);
	});

	it('should handle singular hours from now', function () {
		var time = (1).hour.fromNow().getTime();
		time.should.be.approximately(Date.now() + 36e5, 10);
	});

	it('should handle time relative to a different time', function () {
		(1).hour.until(1e12).getTime().should.equal(1e12 - 36e5);
	});

	it('should handle future time relative to a different time', function () {
		(1).hour.since(1e12).getTime().should.equal(1e12 + 36e5);
	});

});