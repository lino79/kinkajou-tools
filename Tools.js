(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports'], function(_exports) {
			_exports.Tools = factory();
		});
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Tools = factory();
	}
}(this, function() {

	//#region Is

	function isObject(arg) {
		return Object.prototype.toString.call(arg) === '[object Object]';
	}

	function isFunction(arg) {
		return arg instanceof Function || typeof arg == 'function';
	}

	function isArray(arg) {
		return (Array && isFunction(Array.isArray)) ? Array.isArray(arg) : Object.prototype.toString.call(o) === '[object Array]';
	}

	function isBoolean(arg) {
		return typeof arg === 'boolean';
	}

	function isString(arg) {
		return typeof arg === 'string';
	}

	function isNumber(arg) {
		return typeof arg === 'number' && isFinite(arg);
	}

	function isPrimitive(arg) {
		return isString(arg) || isNumber(arg) || isBoolean(arg);
	}

	function isInstanceOf(arg, type) {
		return arg instanceof type;
	}

	//#endregion

	//#region Conversion

	function toFunction(arg, def) {
		return isFunction(arg) ? arg : (isFunction(def) ? def : undefined);
	}

	/**
	 * Convert the input value to an Object.
	 * @param {*} arg any type of value
	 * @param {Object} def (Optional) alternative value. Default: `null`.
	 * @return {Object} an object or the alternative value.
	 */
	function toObject(arg, def) {
		return isObject(arg) ? arg : (isObject(def) ? def : null);
	}

	/**
	 * Convert the input value to an Array.
	 * @param {*} arg any type of value
	 * @param {Array} def (Optional) alternative value. Default: `[]`.
	 * @return {Array} an array or the alternative value.
	 */
	function toArray(arg, def) {
		return isArray(arg) ? arg : (isArray(def) ? def : []);
	}

	/**
	 * Convert the input value to a String.
	 * @param {*} arg any type.
	 * @param {String} def (Optional) Default value. Default: ''.
	 * @return {String} a string.
	 */
	function toString(arg, def) {
		if (isString(arg)) return arg;
		else if (isPrimitive(arg)) return '' + arg;
		else return isString(def) ? def : '';
	}

	function _toNumber(arg, def, min, max, convert) {

		def = isNumber(def) ? def : 0;
		
		if (isNumber(min) && isNumber(max) && min > max) {
			min = max;
		}

		if (isNumber(def) && isNumber(min) && def < min) {
			def = min;
		}

		if (isNumber(def) && isNumber(max) && def > max) {
			def = max;
		}

		var n = isNumber(arg) ? arg : convert(arg);

		if (!isNumber(n)) {
			n = def;
		}

		if (isNumber(min) && n < min) {
			n = convert(min);
		}

		if (isNumber(max) && n > max) {
			n = convert(max);
		}

		return n;
	}

	/**
	 * Convert the input value to an Float.
	 * @param {*} arg any type.
	 * @param {Number} def (Optional) Default value. Default: `0`.
	 * @param {Number} min (Optional) Minimum value.
	 * @param {Number} max (Optional) Maximum value.
	 * @return {Number} a number.
	 */
	function toFloat(arg, def, min, max) {
		return _toNumber(arg, def, min, max, function(arg) {
			return parseFloat('' + arg);
		});
	}

	/**
	 * Convert the input value to an Integer.
	 * @param {*} arg any type.
	 * @param {Number} def (Optional) Default value. Default: `0`.
	 * @param {Number} min (Optional) Minimum value.
	 * @param {Number} max (Optional) Maximum value.
	 * @return {Number} a number.
	 */
	function toInteger(arg, def, min, max) {
		return _toNumber(arg, def, min, max, function(arg) {
			return parseInt('' + arg);
		});
	}

	/**
	 * Convert the input value to a Boolean.
	 * @param {*} arg any type.
	 * @param {Boolean} def (Optional) Default value. Default: `false`.
	 * @return {Boolean} a boolean.
	 */
	function toBoolean(arg, def) {
		if (isBoolean(arg)) {
			return arg;
		} else if (isNumber(arg)) {
			return isFinite(arg) && arg > 0;
		} else if (isString(arg)) {
			return arg === 'true' || toInteger(arg) > 0;
		} else {
			return isBoolean(def) ? def : false;
		}
	}

	//#endregion

	//#region Get/set

	function _splitPath(path) {
		return isArray(path) ? path : toString(path).split('.');
	}

	function set(path, value, root) {
		var prop = root;
		var parts = _splitPath(path);
		var last = parts[parts.length - 1];
		if (parts.length > 1) {
			// Loop over path parts[0..n-2] and dereference
			for (var i = 0; i < parts.length - 1; i++) {
				var part = parts[i];
				prop = prop[part] = {};
			}
			// Set value to object at end of path
			prop[last] = value;
		} else {
			// Simple property set
			prop[path] = value;
		}
		return value;
	}

	function get(path, root) {
		var prop = root;
		var parts = _splitPath(path);
		// Loop over path parts[0..n-1] and dereference
		for (var i = 0; i < parts.length; i++) {
			if (!prop) {
				return;
			}
			var part = parts[i];
			prop = prop[part];
		}
		return prop;
	}

	//#endregion

	//#region Get/set + conversion

	function getAsString(path, root, def) {
		return toString(get(path, root), def);
	}

	function getAsFloat(path, root, def, min, max) {
		return toFloat(get(path, root), def, min, max);
	}

	function getAsInteger(path, root, def, min, max) {
		return toInteger(get(path, root), def, min, max);
	}

	function getAsBoolean(path, root, def) {
		return toBoolean(get(path, root), def) === true;
	}

	function getAsFunction(path, root, def) {
		return toFunction(get(path, root), def);
	}

	function getAsObject(path, root, def) {
		return toObject(get(path, root), def);
	}

	function getAsArray(path, root, def) {
		return toArray(get(path, root), def);
	}

	function getAsInstanceOf(path, root, type) {
		if (!isFunction(type)) throw new TypeError('illegal type');
		try {
			var value = get(path, root);
			return value instanceof type ? value : null;
		} catch (_) {
			return null;
		}
	}

	//#endregion

	//#region Assertion

	function assert(condition, message) {
		if (!Boolean(condition)) {
			throw new Error(isString(message) ? message : 'bad assertion');
		}
	}

	function assertIsObject(arg, argName) {
		assert(isObject(arg), (isString(argName) && argName ? argName : 'argument') + ' is not an object');
	}

	function assertIsFunction(arg, argName) {
		assert(isFunction(arg), (isString(argName) && argName ? argName : 'argument') + ' is not a function');
	}

	function assertIsArray(arg, argName) {
		assert(isArray(arg), (isString(argName) && argName ? argName : 'argument') + ' is not an array');
	}

	function assertIsBoolean(arg, argName) {
		assert(isBoolean(arg), (isString(argName) && argName ? argName : 'argument') + ' is not a boolean');
	}

	function assertIsString(arg, argName) {
		assert(isString(arg), (isString(argName) && argName ? argName : 'argument') + ' is not a string');
	}

	function assertIsNumber(arg, argName) {
		assert(isNumber(arg), (isString(argName) && argName ? argName : 'argument') + ' is not a number');
	}

	function assertIsInstanceOf(arg, type, argName, typeName) {
		assert(
			isInstanceOf(arg, type),
			(isString(argName) && argName ? argName : 'argument')
				+ ' is not an instance of '
				+ (isString(typeName) && typeName ? typeName : 'the input type')
		);
	}

	//#endregion

	return {
		isObject: isObject,
		isFunction: isFunction,
		isArray: isArray,
		isString: isString,
		isNumber: isNumber,
		isBoolean: isBoolean,
		isPrimitive: isPrimitive,
		isInstanceOf: isInstanceOf,
		toObject: toObject,
		toFunction: toFunction,
		toArray: toArray,
		toString: toString,
		toInteger: toInteger,
		toFloat: toFloat,
		toBoolean: toBoolean,
		set: set,
		get: get,
		getAsString: getAsString,
		getAsFloat: getAsFloat,
		getAsInteger: getAsInteger,
		getAsBoolean: getAsBoolean,
		getAsFunction: getAsFunction,
		getAsObject: getAsObject,
		getAsArray: getAsArray,
		getAsInstanceOf: getAsInstanceOf,
		assert: assert,
		assertIsObject: assertIsObject,
		assertIsFunction: assertIsFunction,
		assertIsArray: assertIsArray,
		assertIsBoolean: assertIsBoolean,
		assertIsString: assertIsString,
		assertIsNumber: assertIsNumber,
		assertIsInstanceOf: assertIsInstanceOf,
	};
}));