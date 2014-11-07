/**
 * @fileoverview This is global helper
 *
 * @author Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @requires jQquery
 *
 * @preserve Copyright © 2014 All rights reserved.
 *
 */

;(function($) {

	// ------ String extensions ------ //

	/**
	 * .Net string extensions
	 * @param {String} arg1 initial string 
	 * @param {String} arg2..argN the replacement string
	 * @returns {String}
	 * @example 
	 *      String.Format('My {0} example {1}', 'String.Format', '!');
	 *      //result is 'My String.Format example !'
	 */
	String.Format = function() {
		var s = arguments[0];
		for (var i = 0; i < arguments.length - 1; i++) {
			var reg = new RegExp("\\{" + i + "\\}", "gm");
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	};

	/**
	* Capitalize first letter of the word
	* @returns {String}
	*/
	String.prototype.capitalize = function() {
		return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
			return p1 + p2.toUpperCase();
		});
	};

	/**
	* Check how ends the string
	* @returns {Boolean}
	*/
	String.prototype.endsWith = function(str) {
		return (this.match(str + '$') == str);
	};

	/**
	* Check how starts the string
	* @returns {Boolean}
	*/
	String.prototype.startsWith = function(str) {
		return (this.match('^' + str) == str);
	};

	// ------ jQuery extensions ------ //

	/*
	 * This function check existing of DOM element
	 * @param {Object} selector
	 * @returns {Boolean}
	 */
	$.isExists = function(selector) {
		return ($(selector).length > 0);
	};

	/*
	 * This function check existing of DOM element
	 * @returns {Boolean}
	 */
	$.fn.isExists = function() {
		return ($(this).length > 0);
	};

	/*
	 * Conver value to boolean type
	 * @returns {Boolean}
	 */
	$.toBoolean = function(value) {
		if (value === 'True' || value === 'true' || value === true || value === 1) {
			return true;
		}
		return false;
	};

	/**
	* first/last/odd/even and hover classes to element sets
	* @param {Object} selector
	* @returns {Object} jQuery DOM element
	*/
	$.fn.optimize = function(selector) {
		var $target = $(this);
		var $items = selector && selector.length > 0 ? $target.find(selector) : $target;

		$items.first().addClass('first');
		$items.last().addClass('last');
		$items.filter(':odd').addClass('odd');
		$items.filter(':even').addClass('even');
		return $target;
	};

	/**
	* first/last/odd/even and hover classes to element sets
	* @param {Object} container
	* @param {Object} selector
	*/
	$.optimize = function(container, selector) {
		var $container = container;
		var $items = $(selector, $container);
		$items.optimize();
	};

	/**
	* Get outer Html
	* @returns {String} html string
	*/
	$.fn.outerHtml = function() {
		return $('<div />').html(this.clone()).html();
	};

	/**
	* Equal blocks height
	*/
	$.fn.equalHeight = function() {
		var $elements = $(this);
		resize($elements);
		$(window).resize(function() {
			resize($elements);
		});

		function resize(elements) {
			var $targets = $(elements);
			$targets.css('height', 'auto');
			var max = 0;
			$targets.each(function() {
				var $item = $(this);
				if ($item.height() > max) {
					max = $item.height();
				}
			});
			$targets.height(max);
		}
	};

	/*
	 * This function change sting next way came 123456, get 123,456
	 * @param {String} str - number string to format
	 * @returns {String} - string has US number format
	 */
	$.formatCurrency = function(str) {
		return str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	};

	/*
	 * This function repalce end of the string with '..' if the length of coming string more than 7 symbols
	 * @param {String} value
	 * @returns {String} - it has format 1234..
	 */
	$.stringPreview = function(value) {
		return (value.length > 7) ? value.slice(0, 6) + '..' : value
	};


	// TO SUPPORT IE < 9, WHICH DOESN'T HAVE A INDEXOF
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /*, from*/ ) {
			var len = this.length >>> 0;

			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0)
				from += len;

			for (; from < len; from++) {
				if (from in this &&
					this[from] === elt)
					return from;
			}
			return -1;
		};
	}

	/**
	* Controlling caret state for input and textarea elements
	* @param {Int} position
	* @returns {Object}
	*/
	$.fn.setPositiontForCursor = function(position) {
		if (this.length == 0) return this;
		return $(this).setSelection(position, position);
	};

	/**
	* Controlling caret state for input and textarea elements
	* @param {Int} selectionStart
	* @param {Int} selectionEnd
	* @returns {Object}
	*/
	$.fn.setSelection = function(selectionStart, selectionEnd) {
		if (this.length == 0) return this;
		input = this[0];

		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}

		return this;
	};

	/**
	* You can move the focus to end of any element by calling $(element).focusEnd()
	* @returns {Object}
	*/
	$.fn.focusEnd = function() {
		this.setPositiontForCursor(this.val().length);
		return this;
	};

})(jQuery);