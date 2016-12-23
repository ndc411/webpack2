webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, __dirname) {/**
	 * Created by Administrator on 2016/11/14.
	 */
	var path = __webpack_require__(2);
	var cwd = process.cwd();//cwd() 是当前执行node命令时候的文件夹地址
	                        //__dirname 是被执行的js 文件的地址
	var CURRENT_PATH = path.join(__dirname); // 获取到当前目录
	    views_path = path.join(__dirname + '/src/'+'views/');
	var content = __webpack_require__(3);
	//alert(content.name);
	//document.write(content.content);
	// alert(cwd+"------"+CURRENT_PATH);
	var $ = __webpack_require__(4);
	__webpack_require__(5);
	$('body').prepend('<div class="menu">' + '<ul>' +
	    '<li><a id="home" href='+__dirname+'index.html>校园首页</a></li>' +
	    '<li><a id="media" href=' + views_path + 'media/media.html>校园动态</a></li>' +
	    '<li><a id="activities" href=' + views_path + 'activities/activities.html>精彩活动</a></li>' +
	    '<li><a id="about" href=' + views_path + 'about/about.html>校园简介</a></li>' +
	    '<li><a id="about" href=' + views_path + 'about/about.html>教师风采</a></li>' +
	    '<li><a id="about" href=' + views_path + 'about/about.html>优秀毕业班</a></li>' +
	    '<li><a id="contact" href=' + views_path + 'contact/contact.html>联系我们</a></li>' +
	    '</ul>' +
	    '</div>');

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	var content = '<p class="para">`1`     It works from content! 显然是可以在输出中加上html标签！</p>';
	module.exports.content = content;
	module.exports.name = 'xiao jiang!!!';
	module.exports.login = function () {
	    return content;
	};
	module.exports.login2 = function () {
	    return content;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.1.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-09-22T22:30Z
	 */
	( function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};



		function DOMEval( code, doc ) {
			doc = doc || document;

			var script = doc.createElement( "script" );

			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var
		version = "3.1.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},

		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");

		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {

					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}

				return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );

					if ( elem ) {

						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;




	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}

		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}

		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the master Deferred
				master = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}

			return master.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function( error, stack ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		if ( chainable ) {
			return elems;
		}

		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}

		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}

		if ( data === "false" ) {
			return false;
		}

		if ( data === "null" ) {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}

		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}

		return data;
	}

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};




	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );

		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );

		} else {
			ret = [];
		}

		if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}

		return ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;



	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			if ( delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function( event ) {
			var button = event.button;

			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}

				if ( button & 2 ) {
					return 3;
				}

				if ( button & 4 ) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		/* eslint-disable max-len */

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;

		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;

		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

				/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;

		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];

				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,

				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}

					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}


	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;

					if ( index < 0 ) {
						i = max;

					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				if ( val == null ) {
					return null;
				}

				if ( jQuery.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}

				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win, rect, doc,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;

				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}

			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );

	jQuery.parseJSON = JSON.parse;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}





	return jQuery;
	} );


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "body {\r\n    background-color: #548aff;\r\n    text-align: center;\r\n}\r\n.content-wrap {\r\n    min-width: 1080px;\r\n    margin: auto;\r\n}\r\n.menu {\r\n    min-width: 1200px;\r\n    margin: 150px auto 40px;\r\n}\r\n.menu ul {\r\n    padding: inherit;\r\n}\r\n.menu ul li {\r\n     list-style: none;\r\n     display: inline-block;\r\n     margin: 10px 30px;\r\n }\r\n.menu ul li a:hover,a:active{\r\n    padding: 8px 15px;\r\n    font-size: 18px;\r\n    background: #73ecff;\r\n    border-radius: 5px;\r\n}\r\n.active {\r\n    border-radius: 5px;\r\n    background: #73ecff;\r\n}\r\n.menu ul li a:link,a:visited{\r\n    padding: 8px 15px;\r\n    font-size: 18px;\r\n    color: #e6ffec;\r\n    text-decoration: none;\r\n}\r\n.test-area {\r\n    background-color: #ffc039;\r\n    color: #d8ffff;\r\n    font-size: 4em;\r\n    width: 50%;\r\n    margin: auto;\r\n}\r\n.para {\r\n    font-size: 1em;\r\n}\r\n.img-container {\r\n    margin: 5px auto;\r\n}\r\n.img-11 {\r\n    height: 500px;\r\n    width: 350px;\r\n    border-radius: 100%;\r\n    border: 5px chartreuse solid;\r\n    background: url(" + __webpack_require__(8) + ") no-repeat #9b5bd2;\r\n    background-size: cover;\r\n    display: inline-block;\r\n}\r\n.img-content {\r\n    width: 360px;\r\n    height: 500px;\r\n    border-radius: 100%;\r\n    border: 5px #ff5075 solid;\r\n    display: inline-block;\r\n}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,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9b6LVxMEaJ1JiYpsxe1a1yoRTJhSaShaagoyGWqFU4OFxQmztrUOmzqphSayompmFVM6aidNRCtUQrUmFxSIVFIytScqKTlRSdOqNOqInVG2qNpqNtUaYqp4vsuMzeDgOpUlYYDfMH9DINZoCUAmO0RmNq0bVo0VttUbao2ittq0bVo2pcxNbbVMbVO2qdtTNyAxFpoUQgg11MTFJIMlDINYKFxNesohei0+2IjTFJhUUNu6CJSoVSUrTSUqioWhZiKSunDlu5obR4zqHjN7UpWitMTUqhVKmJrTtW21bbVomKhKopOnVETqiJ1J06oidUROqNMVG2qNOjG2hRch1nJZPJglBIBw2pL5k9gIgyGS3O2Ez20dEpqY0VMbVttURtWiYrbaoiYqNoouianbVp2raJraYputMEW6krgMoi1kyk2UldJnQDM7V6i4ZvNFp4UkiNtURMUkJwiUpCzREwJKVRSSDXRVJVTl02cmGzesqh6ze1KCIrSlVSpKqVMSadpqJ2rbatEwJMTFRtqjTqiJio2ittq0bVG2qNtWiYrbRXOct03MZOsg1gmaumkFO2jswyDXSWrpkJvo0dtFRpito1baK0TFbRNaNFTGitEpMWYkWmJrbatpip21BQVua6IMkoyDLURMGhSVCyVIiTTFek2NTbaLUIIMiNtURMVASgERe1QlSTJSqKhSVURaVCdO2row2L9hUPmFhUoIiomJqVJXUqianbG201onVETFQlUVETAttqTpio0xUaYqNMVomKjTEdExUaYhy3N9Bz+TrWhYJmb1iQR01dRQsZIIZPWFB20Y21aNqjaKmNApjatG1baK0bVETFFUma2nVpjVpia2jUhs6ZmvCiIVQQaxTCkm0pkSgmDE8KTH0G6ob51qgOG7LttSdooUxIiRoNkqTUJUmkrQqirQqnjto7Mivsa4SbCvf0tBB1ExNStC6VMTU7SaJ2radURMUmFRSdMVomKiFRURMVonCiJitE6oiYrRMVG0VyFDd0mOhFoVThg/YUV02cGQtCoRX2FcIaZ0dG1baKjbVtE1o0VtorRMG0bCiJiiqia2hVRMatO1baaSxf15r0wDSoUlUVRMQSqJpQTAi5QtEe66PmOndatq7aMu2isAiRZSC1ETFREwZKVJqFIWIq0KM7esnpkV1lW0iwr7ARBkGaJiRStCqXMSaZia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"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
]);