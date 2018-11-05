export namespace Tools {

	//#region Is
	
	/**
	 * Returns `true` if arg is an object.
	 * @param arg the input value.
	 */
	function isObject(arg: any): boolean;

	/**
	 * Returns `true` if arg is a function.
	 * @param arg the input value.
	 */
	function isFunction(arg: any): boolean;

	/**
	 * Returns `true` if arg is an array.
	 * @param arg the input value.
	 */
	function isArray(arg: any): boolean;

	/**
	 * Returns `true` if arg is a boolean.
	 * @param arg the input value.
	 */
	function isBoolean(arg: any): boolean;

	/**
	 * Returns `true` if arg is a string.
	 * @param arg the input value.
	 */
	function isString(arg: any): boolean;
	
	/**
	 * Returns `true` if arg is a number (`NaN` and `Infinity` are excluded).
	 * @param arg the input value.
	 */
	function isNumber(arg: any): boolean;

	/**
	 * Returns `true` if arg is a string, a number or a boolean.
	 * @param arg the input value.
	 */
	function isPrimitive(arg: any): boolean;

	/**
	 * Returns `true` if arg is an instance of `type`.
	 * @param arg the input value.
	 * @param type a prototype
	 */
	function isInstanceOf<T>(arg: any, type: T): boolean;

	//#endregion

	//#region Conversion

	/**
	 * Returns the input value as a Function or the default value.
	 * @param arg any type of value.
	 * @param def Optional default value (or `undefined`).
	 */
	function toFunction(arg: any, def?: Function): Function;

	/**
	 * Converts the input value to an Object.
	 * @param arg any type of value.
	 * @param def Optional default value (or `null`).
	 */
	function toObject(arg: any, def?: Object): Object;

	/**
	 * Convert the input value to an Array.
	 * @param arg any type of value.
	 * @param def Optional default value (or `[]`).
	 */
	function toArray(arg: any, def?: Array<any>): Array<any>;

	/**
	 * Convert the input value to a String.
	 * @param arg any type of value.
	 * @param def Optional default value (or `''`).
	 */
	function toString(arg: any, def?: string): string;

	/**
	 * Converts the input value to an Float.
	 * @param arg any type of value.
	 * @param def Optional default value (or `0`).
	 * @param min minimum value.
	 * @param max maximum value.
	 */
	function toFloat(arg: any, def?: number, min?: number, max?: number): number;

	/**
	 * Converts the input value to an Integer.
	 * @param arg any type of value.
	 * @param def Optional default value (or `0`).
	 * @param min minimum value.
	 * @param max maximum value.
	 */
	function toInteger(arg: any, def?: number, min?: number, max?: number): number;

	/**
	 * Converts the input value to a Boolean.
	 * @param arg any type of value.
	 * @param def Optional default value (or `false`).
	 */
	function toBoolean(arg: any, def?: boolean): boolean;

	//#endregion

	//#region Get/set

	/**
	 * Set a new (nested) property of `root`.
	 * 
	 * @example
	 * const o = {};
	 * let x = set('a.b.c', 1, o);
	 * // x -> 1, o -> {
	 * //   a: {
	 * //     b: { c: 1 }
	 * //   }
	 * // }
	 * 
	 * @param path the nested path.
	 * @param value the value to set.
	 * @param root the root object.
	 * @return the value in input.
	 */
	function set<T>(path: string|Array<string>, value: T, root: any): T;

	/**
	 * Get a (nested) property from `root`.
	 * 
	 * @example
	 * const z = get('x.y', {
	 *   x: { y: 1 }
	 * });
	 * // z -> 1
	 * 
	 * @param path the nested path.
	 * @param root the root object.
	 * @return the nested value.
	 */
	function get<T>(path: string|Array<string>, root: any): T;

	//#endregion

	//#region Get/set + conversion

	/**
	 * Returns the nested property as a string.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `''`).
	 */
	function getAsString(path: string|Array<string>, root: any, def?: string): string;

	/**
	 * Returns the nested property as a float number.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `0`).
	 * @param min minimum value.
	 * @param max maximum value.
	 */
	function getAsFloat(path: string|Array<string>, root: any, def?: number, min?: number, max?: number): number;

	/**
	 * Returns the nested property as an integer number.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `0`).
	 * @param min minimum value.
	 * @param max maximum value.
	 */
	function getAsInteger(path: string|Array<string>, root: any, def?: number, min?: number, max?: number): number;

	/**
	 * Returns the nested property as a boolean.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `false`).
	 */
	function getAsBoolean(path: string|Array<string>, root: any, def?: boolean): boolean;

	/**
	 * Return the nested property as a function.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `undefined`).
	 */
	function getAsFunction(path: string|Array<string>, root: any, def?: Function): Function;

	/**
	 * Return the nested property as a object.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `null`).
	 */
	function getAsObject(path: string|Array<string>, root: any, def?: Object): Object;

	/**
	 * Return the nested property as an array.
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param def Optional default value (or `[]`).
	 */
	function getAsArray(path: string|Array<string>, root: any, def?: Array<any>): Array<any>;

	/**
	 * Return the nested property as the desired type (or `null`).
	 * @param path the nested property path.
	 * @param root the root object.
	 * @param type a prototype.
	 */
	function getAsInstanceOf<T>(path: string|Array<string>, root: any, type: T): T;

	//#endregion

	//#region Assertion

	/**
	 * Throws an error if the condition is false.
	 * @param condition a boolean value.
	 * @param message error message.
	 */
	function assert(condition: boolean, message: string): void;

	/**
	 * Throws an error if the input value is not an object.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsObject(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not a function.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsFunction(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not an array.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsArray(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not a boolean.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsBoolean(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not a string.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsString(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not a number.
	 * @param arg the input value.
	 * @param argName argument name.
	 */
	function assertIsNumber(arg: any, argName: string): void;

	/**
	 * Throws an error if the input value is not an instance of input type.
	 * @param arg the input value.
	 * @param type a type.
	 * @param argName argument name.
	 * @param typeName the type name.
	 */
	function assertIsInstanceOf<T>(arg: any, type: T, argName: string, typeName: string): void;

	//#endregion

}