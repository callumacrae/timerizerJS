/**
 * TimerizerJS by Callum Macrae. (2).days.ago()!
 *
 * @author Callum Macrae <callum@macr.ae>
 * @license MIT
 */

// Supports AMD, CommonJS, and old fashioned globals.
(function (root, timerizerFactory) {
	if (typeof define === 'function' && define.amd) {
		define(timerizerFactory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = timerizerFactory();
	} else {
		root.Timerizer = timerizerFactory();
	}
}(this, function () {

	/**
	 * The Timerizer constructor; mostly just used for storage.
	 *
	 * @param {number} number Number to convert into seconds by calling a time
	 *                        function such as `.seconds`.
	 * @returns {Timerizer}
	 * @constructor
	 */
	var Timerizer = function (number) {
		if (!(this instanceof Timerizer)) {
			return new Timerizer(number);
		}

		this._number = number;
	};


	///////////////////////////////////
	//  PART ONE: NUMBER TO SECONDS  //
	///////////////////////////////////

	/**
	 * This function adds a getter for an interval of time to a prototype,
	 * ensuring that both the singular and plural versions are added.
	 *
	 * @param {object} obj The object to add to the prototype of.
	 * @param {string} interval The SINGULAR interval of time.
	 * @param {function} getter The getter function.
	 */
	function intervalToPrototype(obj, interval, getter) {
		Object.defineProperty(obj.prototype, interval, { get: getter });
		Object.defineProperty(obj.prototype, interval + 's', { get: getter });
	}

	var seconds = {
		second: 1,
		minute: 60,
		hour: 3600,
		day: 86400,
		week: 604800,
		fortnight: 1209600
	};

	for (var interval in seconds) {
		if (!seconds.hasOwnProperty(interval)) {
			return;
		}

		// Closure to avoid last-one-only problem
		(function (interval, secondsInInterval) {
			intervalToPrototype(Timerizer, interval, function () {
				this._seconds = this._number * secondsInInterval;
				return this;
			});

			intervalToPrototype(Number, interval, function () {
				return new Timerizer(this)[interval];
			});
		})(interval, seconds[interval]);
	}


	/////////////////////////////////////
	//  PART TWO: SECONDS TO RELATIVE  //
	/////////////////////////////////////

	/**
	 * This function is used to make the time functions such as .ago(),
	 * .since(), and .fromNow().
	 *
	 * @param {boolean} forwards True for forwards (since, fromNow), or false
	 *                           for backwards (ago, until). Internal only;
	 *                           don't worry about it too much.
	 * @returns {Function} Returns the generated time function.
	 */
	function relativeTimeFunction(forwards) {

		/**
		 * A function used to turn `(2).days` (either forwards or backwards,
		 * {@see relativeTimeFunction}) into an actual Date object.
		 *
		 * @param {string|number} [time] Optional time to generate relative to.
		 *                               If not specified, will use the current
		 *                               time instead.
		 * @returns {Date} Returns the generated Date object.
		 */
		return function relativeTime(time) {
			if (typeof this._seconds !== 'number') {
				throw new Error('Timerizer seconds not calculated');
			}

			if (time instanceof Date) {
				time = time.getTime();
			} else if (typeof time === 'undefined') {
				time = Date.now();
			} else {
				time = new Date(time).getTime();

				if (isNaN(time)) {
					throw new TypeError('Timerizer: Invalid date');
				}
			}

			// Apparently new Date(undefined) doesn't work. What?
			return new Date(time + (this._seconds * (forwards ? 1e3 : -1e3)));
		}
	}

	Timerizer.prototype.ago = relativeTimeFunction(false);
	Timerizer.prototype.until = relativeTimeFunction(false);

	Timerizer.prototype.fromNow = relativeTimeFunction(true);
	Timerizer.prototype.since = relativeTimeFunction(true);


	return Timerizer;
}));