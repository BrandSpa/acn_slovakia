webpackJsonp([0],{

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maxYear = 19;

function verification(isValid, isPotentiallyValid, isCurrentYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isCurrentYear: isCurrentYear || false
  };
}

function expirationYear(value) {
  var currentFirstTwo, currentYear, firstTwo, len, twoDigitYear, valid, isCurrentYear;

  if (typeof value !== 'string') {
    return verification(false, false);
  }
  if (value.replace(/\s/g, '') === '') {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  len = value.length;

  if (len < 2) {
    return verification(false, true);
  }

  currentYear = new Date().getFullYear();

  if (len === 3) {
    // 20x === 20x
    firstTwo = value.slice(0, 2);
    currentFirstTwo = String(currentYear).slice(0, 2);
    return verification(false, firstTwo === currentFirstTwo);
  }

  if (len > 4) {
    return verification(false, false);
  }

  value = parseInt(value, 10);
  twoDigitYear = Number(String(currentYear).substr(2, 2));

  if (len === 2) {
    isCurrentYear = twoDigitYear === value;
    valid = value >= twoDigitYear && value <= twoDigitYear + maxYear;
  } else if (len === 4) {
    isCurrentYear = currentYear === value;
    valid = value >= currentYear && value <= currentYear + maxYear;
  }

  return verification(valid, valid, isCurrentYear);
}

module.exports = expirationYear;


/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(202),
    now = __webpack_require__(522),
    toNumber = __webpack_require__(523);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__(130);

var _debounce2 = _interopRequireDefault(_debounce);

var _projectsIcons = __webpack_require__(283);

var _projectsIcons2 = _interopRequireDefault(_projectsIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backgroundColors = {
  1: '#b91325',
  2: '#00355f',
  3: '#6e5785',
  4: '#95a0ad',
  5: '#156734',
  6: '#689038',
  7: '#7a2d04',
  8: '#b27009',
  9: '#E4A70F'
};

var Projects = _react2.default.createClass({
  displayName: 'Projects',
  getInitialState: function getInitialState() {
    return { section: 1, bg: '#B91325', donateColor: '#B91325' };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var patt = new RegExp(/#projects-[1-9]/);
    var hash = window.location.hash;
    var num = 1;

    if (patt.test(hash)) {
      num = hash.split('-')[1];
    }

    window.addEventListener('resize', (0, _debounce2.default)(function (event) {
      _this.moveArrow(_this.state.section);
    }, 200));

    setTimeout(function () {
      _this.moveArrow(num);
      _this.changeContent(num);
    }, 1000);
  },
  moveArrow: function moveArrow(num) {
    var left = this.el.querySelector('.projects__icons li:nth-child(' + num + ')').offsetLeft;
    this.el.querySelector('.projects__arrow').style.left = left + 'px';
  },
  changeContent: function changeContent(num) {
    var color = backgroundColors[num];
    this.setState({ bg: color, donateColor: color, section: num });
    this.moveArrow(num);
    this.props.changeSection ? this.props.changeSection(num) : '';
  },
  render: function render() {
    var _this2 = this;

    var _props$contents = this.props.contents,
        contents = _props$contents === undefined ? [] : _props$contents;

    var content = contents[this.state.section - 1] || {};
    var title = content.title,
        text = content.text,
        imgUrl = content.imgUrl;

    // let title = content.title;
    // let text = content.content;
    // let imgUrl = content.imgUrl;

    var styleRight = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '500px'
    };

    var styleLeft = { background: this.state.bg, minHeight: '500px' };

    var donateStyle = {
      background: '#fff',
      borderColor: '#fff',
      textTransform: 'uppercase',
      color: this.state.donateColor
    };

    return _react2.default.createElement(
      'div',
      { className: 'projects', ref: function ref(el) {
          return _this2.el = el;
        } },
      _react2.default.createElement(_projectsIcons2.default, { ref: 'projectIcons', onChange: this.changeContent }),
      _react2.default.createElement(
        'div',
        { className: 'projects__content' },
        _react2.default.createElement('div', { className: 'projects__arrow' }),
        _react2.default.createElement(
          'div',
          {
            className: 'col-4-l projects__content__content-left',
            style: styleLeft
          },
          _react2.default.createElement(
            'h4',
            null,
            title
          ),
          _react2.default.createElement('div', {
            className: 'projects__content__content-left__text',
            dangerouslySetInnerHTML: { __html: text }
          }),
          _react2.default.createElement(
            'button',
            { className: 'bs-donate', style: donateStyle },
            this.props.donate
          )
        ),
        _react2.default.createElement('div', {
          className: 'col-8-l projects__content__content-right',
          style: styleRight
        })
      )
    );
  }
});

exports.default = Projects;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(162);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionVideo = _react2.default.createClass({
  displayName: 'SectionVideo',
  getDefaultProps: function getDefaultProps() {
    return {
      imgUrl: '',
      url: 'https://www.youtube.com/embed/_lQvw2vSDbs',
      imageStyle: {}
    };
  },
  showVideo: function showVideo(e) {
    e.preventDefault();
    this.modal.show();
  },
  render: function render() {
    var _this = this;

    var linkStyle = { float: 'left', lineHeight: '0' };
    var imageStyle = { width: '100px', margin: '0 auto' };
    imageStyle = _extends({}, imageStyle, this.props.imageStyle);

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
          return _this.modal = modal;
        }, url: this.props.url }),
      _react2.default.createElement(
        'a',
        { href: '#', className: 'image-video__link', style: linkStyle, onClick: this.showVideo },
        _react2.default.createElement('img', { style: imageStyle, src: this.props.imgUrl, alt: '' })
      )
    );
  }
});

exports.default = SectionVideo;

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = _react2.default.createClass({
  displayName: 'Modal',
  getInitialState: function getInitialState() {
    return { show: false };
  },
  componentDidMount: function componentDidMount() {
    document.addEventListener('keydown', this.handleEscKey, false);
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  },
  handleEscKey: function handleEscKey(e) {
    if (e.keyCode == 27) this.setState({ show: false });
  },
  close: function close(e) {
    e.preventDefault();
    this.setState({ show: false });
  },
  show: function show() {
    this.setState({ show: true });
  },
  render: function render() {
    var url = this.props.url;


    var iframeStyle = {
      height: window.innerHeight ? window.innerHeight : '100hv'
    };

    return _react2.default.createElement(
      'div',
      { className: this.state.show ? 'modal modal--show' : 'modal' },
      _react2.default.createElement(
        'a',
        { className: 'modal__close', href: '#', onClick: this.close },
        _react2.default.createElement('i', { className: 'ion-close' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'iframe-container', style: iframeStyle },
        this.state.show ? _react2.default.createElement('iframe', {
          src: url + '?autoplay=1',
          frameBorder: '0',
          height: '315',
          width: '100%',
          allowFullScreen: true
        }) : ''
      )
    );
  }
});

exports.default = Modal;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxLength = maxLength;
exports.onlyNum = onlyNum;
function maxLength() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var length = arguments[1];

  return val.substring(0, length);
}

function onlyNum() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (typeof val == 'string') {
    return val.replace(/[^0-9]+/, '');
  }

  if (typeof val == 'number') {
    return val.toString().replace(/[^0-9]+/, '');
  }

  console.error('onlyNum val is not a string or number: ', val);
}

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar [Burma]", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Guinea Conakry", "Jordan", "Lithuania", "Micronesia", "Moldova"].sort();

exports.default = countries;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function verification(isValid, isPotentiallyValid, isValidForThisYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isValidForThisYear: isValidForThisYear || false
  };
}

function expirationMonth(value) {
  var month, result;
  var currentMonth = new Date().getMonth() + 1;

  if (typeof value !== 'string') {
    return verification(false, false);
  }
  if (value.replace(/\s/g, '') === '' || value === '0') {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  month = parseInt(value, 10);

  if (isNaN(value)) {
    return verification(false, false);
  }

  result = month > 0 && month < 13;

  return verification(result, result, result && month >= currentMonth);
}

module.exports = expirationMonth;


/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(201);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(517);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 202:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            target[source] = true;
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = __webpack_require__(97);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(239);

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__(627);

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__(628);

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _assertString = __webpack_require__(97);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(str) {
  (0, _assertString2.default)(str);
  return str.length === 0;
}
module.exports = exports['default'];

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accordion = _react2.default.createClass({
  displayName: 'Accordion',
  getInitialState: function getInitialState() {
    return { show: false };
  },
  componentDidMount: function componentDidMount() {
    return { content: '', btnTitle: 'Toggle' };
  },
  toggle: function toggle() {
    this.setState({ show: !this.state.show });
  },
  render: function render() {
    var _props = this.props,
        content = _props.content,
        btnTitle = _props.btnTitle;

    var btnStyle = {
      width: '100%',
      height: '60px',
      border: 'none',
      background: '#687f87',
      borderRadius: '0',
      fontSize: '18px',
      fontWeight: 'normal'
    };

    return _react2.default.createElement(
      'div',
      { className: 'accordion' },
      _react2.default.createElement(
        'button',
        {
          className: 'accordion__btn',
          style: btnStyle,
          onClick: this.toggle
        },
        btnTitle,
        ' ',
        _react2.default.createElement('i', {
          className: this.state.show ? 'ion-chevron-up' : 'ion-chevron-down'
        })
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'accordion__content',
          style: this.state.show ? { display: 'block' } : { display: 'none' }
        },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: content } })
      )
    );
  }
});

exports.default = Accordion;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _sectionVideo = __webpack_require__(155);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CampaignsSlider = _react2.default.createClass({
  displayName: 'CampaignsSlider',
  getInitialState: function getInitialState() {
    return { currentSlide: 0, left: '0' };
  },
  getDefaultProps: function getDefaultProps() {
    return { slides: [], interval: 0 };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.interval = setInterval(function () {
      _this.nextSlide(false);
    }, this.props.interval);
  },
  nextSlide: function nextSlide() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (clear) clearInterval(this.interval);
    var total = this.props.slides.length - 1;
    var left = this.state.currentSlide < total ? this.state.currentSlide + 1 : 0;
    this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
  },
  prevSlide: function prevSlide() {
    clearInterval(this.interval);
    var total = this.props.slides.length - 1;
    var left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
  },
  render: function render() {
    var slides = this.props.slides;

    var viewportWidth = 100 * slides.length + '%';
    var slideWidth = 100 / slides.length + '%';
    var viewportStyle = { width: viewportWidth, left: this.state.left };

    return _react2.default.createElement(
      'div',
      { className: 'campaigns-slider' },
      _react2.default.createElement(
        'div',
        { className: 'campaigns-slider__viewport', style: viewportStyle },
        slides.map(function (slide, i) {
          return _react2.default.createElement(
            'div',
            {
              key: i,
              className: 'campaigns-slider__slide',
              style: { width: slideWidth }
            },
            _react2.default.createElement(_sectionVideo2.default, {
              imgUrl: slide.image,
              url: slide.url,
              imageStyle: { width: '100%' }
            }),
            _react2.default.createElement(
              'div',
              {
                className: 'campaigns-slider__slide__content',
                style: { background: slide.bg }
              },
              _react2.default.createElement(
                'h4',
                null,
                _react2.default.createElement(
                  'a',
                  { href: slide.url ? slide.url : '#' },
                  slide.title
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                slide.content
              )
            )
          );
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'campaigns-slider__btns' },
        _react2.default.createElement(
          'button',
          { className: 'campaigns-slider__btns__prev', onClick: this.prevSlide },
          _react2.default.createElement('i', { className: 'ion-chevron-left' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'campaigns-slider__btns__next', onClick: this.nextSlide },
          _react2.default.createElement('i', { className: 'ion-chevron-right' })
        )
      )
    );
  }
});

exports.default = CampaignsSlider;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _isEmpty = __webpack_require__(238);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

var _obj_to_formdata = __webpack_require__(284);

var _obj_to_formdata2 = _interopRequireDefault(_obj_to_formdata);

var _getCountries = __webpack_require__(164);

var _getCountries2 = _interopRequireDefault(_getCountries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contactForm = _react2.default.createClass({
  displayName: 'contactForm',
  getInitialState: function getInitialState() {
    return {
      contact: { name: '', lastname: '', email: '', country: '' },
      errors: { name: false, lastname: false, email: false },
      countries: _getCountries2.default,
      loading: false,
      showMemberExists: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return { validationMessages: {}, placeholders: {}, texts: {}, redirect: '' };
  },
  componentDidMount: function componentDidMount() {
    this.setState({
      contact: _extends({}, this.state.contact, { country: this.props.country })
    });
  },
  checkEmpty: function checkEmpty(field) {
    return (0, _isEmpty2.default)(this.state.contact[field]);
  },
  validate: function validate() {
    var _this = this;

    var errors = {};
    var validations = Object.keys(this.state.errors).map(function (field) {
      var val = _this.checkEmpty(field);
      errors = _extends({}, errors, _defineProperty({}, field, val));
      return val;
    });

    this.setState({ errors: errors });

    return Promise.all(validations);
  },
  isValid: function isValid() {
    return this.validate().then(function (arr) {
      return arr.every(function (item) {
        return item == false;
      });
    }).catch(function (err) {
      return console.error(err);
    });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var data = (0, _obj_to_formdata2.default)(this.state.contact);
    this.isValid().then(this.storeContact).catch(function (err) {
      return console.error(err);
    });
  },
  storeContact: function storeContact(isValid) {
    var _this2 = this;

    var _state$contact = this.state.contact,
        email = _state$contact.email,
        name = _state$contact.name,
        lastname = _state$contact.lastname,
        country = _state$contact.country;


    var mc_data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: { NAME: name + ' ' + lastname, COUNTRY: country },
      update_existing: true
    };

    var data = _qs2.default.stringify({ action: 'mailchimp_subscribe', data: mc_data });

    if (isValid) {
      this.setState({ loading: true });
      _axios2.default.post('/wp-admin/admin-ajax.php', data).then(function (res) {
        if (res.data.id) window.location = _this2.props.redirect;
        if (res.data.title == 'Member Exists') {
          console.error('member Exists');
          _this2.setState({ showMemberExists: true, loading: false });
        };
      }).catch(function (err) {
        return console.error(err);
      });
    }
  },
  handleChange: function handleChange(field, e) {
    var contact = _extends({}, this.state.contact, _defineProperty({}, field, e.target.value));
    this.setState({ contact: contact });
  },
  render: function render() {
    var _state = this.state,
        contact = _state.contact,
        errors = _state.errors;
    var _props = this.props,
        placeholders = _props.placeholders,
        validationMessages = _props.validationMessages,
        texts = _props.texts;


    return _react2.default.createElement(
      'form',
      {
        style: { textAlign: 'center' },
        className: 'form-inline contact-form',
        onSubmit: this.handleSubmit
      },
      _react2.default.createElement(
        'div',
        { className: 'input-container' },
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: placeholders.name,
          onChange: this.handleChange.bind(null, 'name'),
          value: contact.name
        }),
        _react2.default.createElement(
          'div',
          { className: errors.name ? 'input-error' : 'hidden' },
          errors.name,
          ' ',
          validationMessages.name
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'input-container' },
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: placeholders.lastname,
          onChange: this.handleChange.bind(null, 'lastname'),
          value: contact.lastname
        }),
        _react2.default.createElement(
          'div',
          { className: errors.lastname ? 'input-error' : 'hidden' },
          validationMessages.lastname
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'input-container' },
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: placeholders.email,
          onChange: this.handleChange.bind(null, 'email'),
          value: contact.email
        }),
        _react2.default.createElement(
          'div',
          { className: errors.email ? 'input-error' : 'hidden' },
          validationMessages.email
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'input-container' },
        _react2.default.createElement(
          'select',
          {
            onChange: this.handleChange.bind(null, 'country'),
            value: contact.country
          },
          _react2.default.createElement(
            'option',
            { value: '' },
            texts.select_country
          ),
          this.state.countries.map(function (country, i) {
            return _react2.default.createElement(
              'option',
              { key: i, value: country },
              country
            );
          })
        )
      ),
      _react2.default.createElement(
        'button',
        { style: { marginLeft: '-2px' }, onClick: this.handleSubmit, disabled: this.state.loading },
        texts.button,
        this.state.loading ? '...' : ''
      ),
      _react2.default.createElement(
        'span',
        { style: this.state.showMemberExists ? _defineProperty({ color: '#fff', display: 'inline-block', width: '90%', padding: '10px', margin: '5px auto', background: '#f4334a' }, 'color', '#fff') : { display: 'none' } },
        'you are already praying'
      )
    );
  }
});

exports.default = contactForm;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _amount = __webpack_require__(275);

var _amount2 = _interopRequireDefault(_amount);

var _creditCard = __webpack_require__(279);

var _creditCard2 = _interopRequireDefault(_creditCard);

var _contact = __webpack_require__(278);

var _contact2 = _interopRequireDefault(_contact);

var _sendTransaction = __webpack_require__(285);

var _sendTransaction2 = _interopRequireDefault(_sendTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoint = '/wp-admin/admin-ajax.php';

var Donate = _react2.default.createClass({
  displayName: 'Donate',
  getInitialState: function getInitialState() {
    return {
      section: 0,
      left: 0,
      loading: false,
      donation_type: 'monthly',
      amount: 30,
      currency: 'usd',
      countries: [],
      contact: { name: '', email: '', country: '' },
      stripe: {
        card_type: '',
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        token: ''
      },
      errors: { stripe: {}, contact: {} }
    };
  },
  getDefaultProps: function getDefaultProps() {
    return { texts: {}, redirect: {} };
  },
  componentWillMount: function componentWillMount() {
    this.fetchCountries();
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.donateForm.addEventListener('keydown', function (e) {
      if (e.which == 9) {
        e.preventDefault();
        _this.nextSection();
      }
    });
  },
  fetchCountries: function fetchCountries() {
    var _this2 = this;

    var data = _qs2.default.stringify({ action: 'countries' });

    return _axios2.default.post(endpoint, data).then(function (res) {
      _this2.setState({ countries: res.data });
      return res.data;
    });
  },
  handleChange: function handleChange(field) {
    this.setState(_extends({}, this.state, field));
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    this.nextSection();
  },
  stripeToken: function stripeToken() {
    var _this3 = this;

    var data = _qs2.default.stringify({ action: 'stripe_token', data: this.state.stripe });

    return _axios2.default.post(endpoint, data).then(function (res) {
      if (res.data.id) {
        var stripe = _extends({}, _this3.state.stripe, { token: res.data.id });
        _this3.setState({ loading: false, stripe: stripe });
      }

      if (res.data.stripeCode) {
        _this3.setState({ loading: false, declined: true });
      }
    });
  },
  stripeCharge: function stripeCharge() {
    var _state = this.state,
        contact = _state.contact,
        currency = _state.currency,
        amount = _state.amount,
        donation_type = _state.donation_type,
        token = _state.stripe.token;


    var data = _extends({}, contact, {
      currency: currency,
      amount: amount,
      donation_type: donation_type,
      stripe_token: token
    });

    var dataAjax = _qs2.default.stringify({ action: 'stripe_charge', data: data });

    return _axios2.default.post(endpoint, dataAjax);
  },
  completeTransaction: function completeTransaction() {
    var stripeResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _state2 = this.state,
        amount = _state2.amount,
        donation_type = _state2.donation_type;

    var base = this.props.redirect[donation_type];
    var customer = stripeResponse.customer,
        id = stripeResponse.id;

    var order = { id: this.contact.email + '-' + id, amount: amount };
    (0, _sendTransaction2.default)(order).then(function () {
      var url = base + '?customer_id=' + customer + '-' + id + '&order_revenue=' + amount + '&order_id=' + id;
      window.location = url;
    });
  },
  creditCardIsValid: function creditCardIsValid() {
    var errs = this.creditCard.allValidations();
    return Object.keys(errs.stripe).every(function (key) {
      return errs.stripe[key] == true;
    });
  },
  contactIsValid: function contactIsValid() {
    var errs = this.contact.validateAll();
    return Object.keys(errs.contact).every(function (key) {
      return errs.contact[key] == true;
    });
  },
  nextSection: function nextSection() {
    var _this4 = this;

    var section = this.state.section < 2 ? this.state.section + 1 : 2;

    if (this.state.section == 1) {
      if (!this.creditCardIsValid()) return false;
      this.stripeToken();
    }

    if (this.state.section == 2) {
      if (!this.contactIsValid()) return false;
      this.stripeCharge().then(function (res) {
        return _this4.completeTransaction(res.data);
      });
    }

    var left = '-' + section * 100 + '%';

    if (this.state.section == 0) {
      this.setState({ section: section, left: left, loading: false });
    } else {
      this.setState({ section: section, left: left });
    }
  },
  prevSection: function prevSection(e) {
    e.preventDefault();
    var section = this.state.section >= 0 ? this.state.section - 1 : 0;
    var left = '-' + section * 100 + '%';
    this.setState({ section: section, left: left });
  },
  render: function render() {
    var _this5 = this;

    var sectionWidth = 100 / 3 + '%';
    var viewPortStyle = { width: '300%', left: this.state.left };
    var donationTypeStyle = {
      display: 'inline',
      marginLeft: '15px',
      color: '#fff'
    };
    var backBtnStyle = {
      float: 'right',
      background: 'transparent',
      border: 'none'
    };

    return _react2.default.createElement(
      'form',
      {
        onSubmit: this.handleSubmit,
        className: 'donate_react',
        ref: function ref(donate) {
          return _this5.donateForm = donate;
        }
      },
      _react2.default.createElement(
        'div',
        { className: 'donate_react__viewport', style: viewPortStyle },
        _react2.default.createElement(_amount2.default, _extends({}, this.state, this.props, {
          width: sectionWidth,
          onChange: this.handleChange
        })),
        _react2.default.createElement(_creditCard2.default, _extends({
          ref: function ref(creditCard) {
            return _this5.creditCard = creditCard;
          }
        }, this.state, this.props, {
          width: sectionWidth,
          onChange: this.handleChange
        })),
        _react2.default.createElement(_contact2.default, _extends({
          ref: function ref(contact) {
            return _this5.contact = contact;
          }
        }, this.state, this.props, {
          width: sectionWidth,
          onChange: this.handleChange
        }))
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'button',
          {
            className: 'donate_react__submit pull-left',
            onClick: this.handleSubmit,
            disabled: this.state.loading
          },
          this.state.section == 1 ? this.props.texts.next : this.props.texts.donate
        ),
        _react2.default.createElement(
          'span',
          { style: donationTypeStyle },
          this.state.amount + ' USD ' + this.props.texts[this.state.donation_type]
        ),
        this.state.section > 0 ? _react2.default.createElement(
          'button',
          { style: backBtnStyle, onClick: this.prevSection },
          this.props.texts.back
        ) : ''
      )
    );
  }
});

exports.default = Donate;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

var _isEmail = __webpack_require__(237);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _getCountries = __webpack_require__(164);

var _getCountries2 = _interopRequireDefault(_getCountries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var endpoint = '/wp-admin/admin-ajax.php';

var DownloadPdf = _react2.default.createClass({
	displayName: 'DownloadPdf',
	getDefaultProps: function getDefaultProps() {
		return {
			btn: {
				text: '',
				background: ''
			},
			texts: {},
			countries: _getCountries2.default,
			pdf_url: ''
		};
	},
	getInitialState: function getInitialState() {
		var country = this.props.country;


		return {
			email: '',
			errors: {
				email: false
			},
			country: country
		};
	},
	validate: function validate() {
		var _this = this;

		var errors = {};

		var validations = Object.keys(this.state.errors).map(function (field) {
			var val = !(0, _isEmail2.default)(_this.state[field]);
			errors = _extends({}, errors, _defineProperty({}, field, val));
			return val;
		});

		this.setState({ errors: errors });

		return Promise.all(validations);
	},
	isValid: function isValid() {
		return this.validate().then(function (arr) {
			return arr.every(function (item) {
				return item == false;
			});
		}).catch(function (err) {
			return console.error(err);
		});
	},
	handlepdf: function handlepdf(e) {
		e.preventDefault();
		this.isValid().then(this.storeContact);
	},
	storeContact: function storeContact(isValid) {
		var _this2 = this;

		var _state = this.state,
		    email = _state.email,
		    country = _state.country;

		var mc_data = {
			email_address: email,
			status: 'subscribed',
			merge_fields: { NAME: '', COUNTRY: country },
			update_existing: true
		};

		var data = _qs2.default.stringify({ action: 'mailchimp_subscribe', data: mc_data });

		if (isValid) {
			_axios2.default.post(endpoint, data).then(function (res) {
				if (res.data.id) window.location = _this2.props.pdf_url;
			});
		}
	},
	handleChange: function handleChange(field, e) {
		this.setState(_extends({}, this.state, _defineProperty({}, field, e.target.value)));
	},
	render: function render() {
		var _props = this.props,
		    countries = _props.countries,
		    btn = _props.btn,
		    texts = _props.texts;
		var errors = this.state.errors;


		var btnStyle = {
			borderColor: btn.background,
			background: btn.background
		};

		return _react2.default.createElement(
			'form',
			{ onSubmit: this.handlepdf, className: 'form-inline download-pdf' },
			_react2.default.createElement(
				'div',
				{ className: 'input-container' },
				_react2.default.createElement('input', {
					type: 'text',
					placeholder: texts.email,
					onChange: this.handleChange.bind(null, 'email'),
					value: this.state.email
				}),
				_react2.default.createElement(
					'div',
					{ className: errors.email ? 'input-error' : 'hidden' },
					errors.email,
					' ',
					texts.validation_email
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'input-container' },
				_react2.default.createElement(
					'select',
					{
						onChange: this.handleChange.bind(null, 'country'),
						value: this.state.country || this.props.country
					},
					countries.map(function (country, i) {
						return _react2.default.createElement(
							'option',
							{ key: i, value: country },
							country
						);
					})
				)
			),
			_react2.default.createElement(
				'button',
				{
					onClick: this.handlepdf,
					style: btnStyle },
				btn.text
			)
		);
	}
});

exports.default = DownloadPdf;

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected ; (35:27)\n\n\u001b[0m \u001b[90m 33 | \u001b[39m\tgetImage(e) {\n \u001b[90m 34 | \u001b[39m\t\t\u001b[36mif\u001b[39m(e\u001b[33m.\u001b[39mtarget\u001b[33m.\u001b[39mwidth \u001b[33m<\u001b[39m e\u001b[33m.\u001b[39mtarget\u001b[33m.\u001b[39mheight) {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 35 | \u001b[39m\t\t\te\u001b[33m.\u001b[39mtarget\u001b[33m.\u001b[39mstyle\u001b[33m.\u001b[39mmaxWidth \u001b[32m'45%'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m\t\t\t                        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 36 | \u001b[39m\t\t}\n \u001b[90m 37 | \u001b[39m\t}\u001b[33m,\u001b[39m\n \u001b[90m 38 | \u001b[39m\u001b[0m\n");

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _headerSlide = __webpack_require__(280);

var _headerSlide2 = _interopRequireDefault(_headerSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerSlider = _react2.default.createClass({
  displayName: 'headerSlider',
  getInitialState: function getInitialState() {
    return { currentSlide: 0, left: '0' };
  },
  getDefaultProps: function getDefaultProps() {
    return { slides: [], interval: 5000, anchor: '#' };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this.interval = setInterval(function () {
      _this.nextSlide(false);
    }, this.props.interval);
  },
  nextSlide: function nextSlide() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (clear) clearInterval(this.interval);
    var total = this.props.slides.length - 1;
    var left = this.state.currentSlide < total ? this.state.currentSlide + 1 : 0;
    this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
  },
  prevSlide: function prevSlide() {
    clearInterval(this.interval);
    var total = this.props.slides.length - 1;
    var left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({ left: '-' + left * 100 + '%', currentSlide: left });
  },
  render: function render() {
    var slides = this.props.slides;

    var viewportWidth = 100 * slides.length + '%';
    var slideWidth = 100 / slides.length + '%';
    var windowHeight = window.innerHeight;
    var headerBannerHeight = document.querySelector('.header-banner') ? document.querySelector('.header-banner').offsetHeight : 0;
    var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
    var sliderHeight = windowHeight && navHeight && headerBannerHeight ? windowHeight - navHeight - headerBannerHeight : 'auto';

    var viewportStyle = {
      width: viewportWidth,
      left: this.state.left,
      height: sliderHeight
    };

    return _react2.default.createElement(
      'div',
      { className: 'slider', style: { height: sliderHeight } },
      _react2.default.createElement(
        'div',
        {
          className: 'slider__viewport',
          style: viewportStyle
        },
        slides.map(function (slide, i) {
          slide = _extends({}, slide, { width: slideWidth, height: sliderHeight });
          return _react2.default.createElement(_headerSlide2.default, _extends({ key: i }, slide));
        })
      ),
      slides.length > 1 ? _react2.default.createElement(
        'div',
        { className: 'slider__btns' },
        _react2.default.createElement(
          'button',
          { className: 'slider__btns__prev', onClick: this.prevSlide },
          _react2.default.createElement('i', { className: 'ion-chevron-left' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'slider__btns__next', onClick: this.nextSlide },
          _react2.default.createElement('i', { className: 'ion-chevron-right' })
        )
      ) : ''
    );
  }
});

exports.default = headerSlider;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _minigrid = __webpack_require__(524);

var _minigrid2 = _interopRequireDefault(_minigrid);

var _debounce = __webpack_require__(130);

var _debounce2 = _interopRequireDefault(_debounce);

var _post = __webpack_require__(281);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoint = '/wp-admin/admin-ajax.php';

var Posts = _react2.default.createClass({
  displayName: 'Posts',
  getInitialState: function getInitialState() {
    return { posts: [], paged: 1, seeMore: true };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    var data = _qs2.default.stringify({ action: 'get_posts' });

    _axios2.default.post(endpoint, data).then(function (res) {
      _this.setState({ posts: res.data });
    }).catch(function (err) {
      return console.error(err);
    });
  },


  componentDidUpdate: function componentDidUpdate() {
    this.initGrid();
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', (0, _debounce2.default)(this.initGrid, 300));
    this.initGrid();
  },
  initGrid: function initGrid() {
    if (this.state.posts && this.state.posts.length > 0) {
      var container = this.grid;
      var grid = new _minigrid2.default({ container: container, item: '.grid-item' });

      grid.mount();
    }
  },
  goToPosts: function goToPosts() {
    window.location = this.props.see_more_link;
  },
  render: function render() {
    var _this2 = this;

    var posts = this.state.posts;


    var postMain = posts.map(function (post, i) {
      if (i == 0) {
        return _react2.default.createElement(_post2.default, _extends({ key: i, onImageLoaded: _this2.initGrid }, _this2.props, { type: 'main', post: post }));
      }
    });

    var postsNodes = posts.map(function (post, i) {
      if (i !== 0) {
        return _react2.default.createElement(_post2.default, _extends({ key: i, onImageLoaded: _this2.initGrid }, _this2.props, { type: 'item', post: post }));
      }
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { ref: function ref(grid) {
            return _this2.grid = grid;
          } },
        postMain,
        _react2.default.createElement(
          'div',
          { className: 'grid-items' },
          postsNodes
        )
      ),
      _react2.default.createElement(
        'button',
        {
          style: { display: 'block' },
          onClick: this.goToPosts,
          className: this.state.seeMore ? 'bs-see-more' : 'hidden'
        },
        this.props.see_more
      )
    );
  }
});

exports.default = Posts;

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _projects = __webpack_require__(154);

var _projects2 = _interopRequireDefault(_projects);

var _postsAbout = __webpack_require__(282);

var _postsAbout2 = _interopRequireDefault(_postsAbout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = {
	1: '#b91325',
	2: '#00355f',
	3: '#6e5785',
	4: '#95a0ad',
	5: '#156734',
	6: '#689038',
	7: '#7a2d04',
	8: '#b27009',
	9: '#E4A70F'
};

var ProjectsAbout = _react2.default.createClass({
	displayName: 'ProjectsAbout',
	getInitialState: function getInitialState() {
		return {
			section: 0
		};
	},
	handleSection: function handleSection(i) {
		var section = i - 1;
		this.setState({ section: section });
	},
	render: function render() {
		var section = this.state.section;


		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_projects2.default, {
				contents: this.props.projects,
				donate: this.props.donate,
				changeSection: this.handleSection
			}),
			_react2.default.createElement(
				'div',
				{ className: 'projects-about-num' },
				_react2.default.createElement(
					'div',
					{
						className: 'projects-about-num__num',
						style: {
							width: '50%',
							textAlign: 'center',
							paddingTop: '20px',
							float: 'left', height: '100px',
							background: '#ECEAEC',
							color: colors[this.state.section + 1]
						}
					},
					_react2.default.createElement(
						'h2',
						null,
						this.props.projects[section] ? this.props.projects[section].number : ''
					)
				),
				_react2.default.createElement(
					'div',
					{
						className: 'projects-about-num__text',
						style: { width: '50%', float: 'left', height: '100px', padding: '40px', textAlign: 'center' }
					},
					this.props.projects[section] ? this.props.projects[section].number_text : ''
				)
			),
			_react2.default.createElement(
				'div',
				{ style: { background: '#F8F6F8', padding: '80px 0', float: 'left', width: '100%' } },
				_react2.default.createElement(
					'div',
					{ className: 'l-wrap' },
					_react2.default.createElement(
						'h3',
						{ style: {
								color: '#324049',
								textTransform: 'uppercase',
								marginBottom: '20px',
								marginLeft: '15px',
								fontWeight: 'normal'
							}
						},
						this.props.texts.stories
					),
					_react2.default.createElement(_postsAbout2.default, {
						category: this.props.projects[section] ? this.props.projects[section].post_category : ''
					})
				)
			)
		);
	}
});

exports.default = ProjectsAbout;

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  $('.bs-donate a').text(bs.donate);
  $('.bs-donate').on('click', function (e) {
    e.preventDefault();
    if (ga) ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);

    var data = _qs2.default.stringify({ action: 'donate_redirect' });

    _axios2.default.post('/wp-admin/admin-ajax.php', data).then(function (res) {
      return window.location = res.data;
    });
  });
};

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollViaCrucisNav;

var _debounce = __webpack_require__(130);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollViaCrucisNav() {
  var onScroll = (0, _debounce2.default)(function () {

    var $nav = $('.nav');
    var $viaCrucisNav = $('.via-crucis-nav__container');
    var $navToggle = $('.via-crucis-toggle');
    var navTop = $nav ? $nav.offset().top : 0;
    var viaCrucisToggleTop = $navToggle ? $navToggle.offset().top : 0;
    var viaCrucisLeft = $('.via-crucis__left') ? $('.via-crucis__left').offset().top : 0;

    if (navTop > viaCrucisLeft) {
      $navToggle.addClass('via-crucis-toggle--fixed');
      $viaCrucisNav.addClass('via-crucis-nav__container--fixed');
    } else {
      $navToggle.removeClass('via-crucis-toggle--fixed');
      $viaCrucisNav.removeClass('via-crucis-nav__container--fixed');
    }
  }, 200);

  if ($('.via-crucis-toggle').length > 0 && $('.nav').length > 0 && window.outerHeight <= 767) {
    window.addEventListener('scroll', onScroll);
  }
}

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMenu = function setMenu() {
  var $menu = $('.menu');
  var currentLang = $('.menu .current-lang > a');
  $('.menu .current-lang').addClass('dropdown');
  $('.menu .current-lang').append('<div class="dropdown-content"></div>');
  var langs = $('.menu .lang-item').not($('.current-lang'));

  $('.menu').addClass('menu--show');

  currentLang.on('click', function (e) {
    e.preventDefault();
    var $dropdown = $menu.find('.dropdown-content');

    if ($dropdown.hasClass('dropdown-content--show')) {
      $dropdown.removeClass('dropdown-content--show');
      return;
    }

    $dropdown.addClass('dropdown-content--show');
  });

  langs.each(function () {
    $menu.find('.dropdown-content').append($(this).html());
    $(this).remove();
  });

  var newText = currentLang.text() + ' <i class="ion-chevron-down"></i>';
  currentLang.html(newText);
};

exports.default = setMenu;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMenuMobile = function setMenuMobile() {
  $('.open-menu').on('click', function () {
    if ($('.menu--mobile').hasClass('menu--mobile--open')) {
      $(document.body).removeClass('menu-open');
      $('.menu--mobile').removeClass('menu--mobile--open');
    } else {
      $(document.body).addClass('menu-open');
      $('.menu--mobile').addClass('menu--mobile--open');
    }
  });

  $('.close-menu').on('click', function (e) {
    $(document.body).removeClass('menu-open');
    $('.menu--mobile').removeClass('menu--mobile--open');
  });
};

exports.default = setMenuMobile;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = smoothScroll;
function smoothScroll() {
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      var less = $('.nav') ? $('.nav').height() + 20 : 0;

      var scrollTop = $(hash) ? $(hash).offset().top - less : 0;
      console.log($(hash));
      $('html, body').animate({ scrollTop: scrollTop }, 800, function () {});
    }
  });
}

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleViaCrucisNav;
function toggleViaCrucisNav() {
  if ($('.via-crucis-toggle')) {
    $('.via-crucis-toggle').on('click', function (e) {
      e.preventDefault();
      $('.via-crucis-toggle i').toggleClass('ion-chevron-up');
      $('.via-crucis-nav__container').toggleClass("via-crucis-nav__container--open");
    });
  }
}

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = multipleRender;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(156);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function multipleRender(component, selector) {
	if (document.querySelectorAll(selector).length >= 1) {
		var containers = [].concat(_toConsumableArray(document.querySelectorAll(selector)));
		var components = [];

		containers.forEach(function (el) {
			var props = {};

			try {
				props = el.getAttribute('data-props') ? JSON.parse(el.getAttribute('data-props')) : {};
			} catch (err) {
				console.error('Check json structure on data-props', err);
			}

			var componentElement = _react2.default.createElement(component, _extends({}, props));

			if (_react2.default.isValidElement(componentElement)) {
				(0, _reactDom.render)(componentElement, el);
				components = components.concat([componentElement]);
			} else {
				console.error('check is a valid component');
			}
		});

		return components;
	}
}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.27 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,d){setTimeout(d,b.f)});Promise.race([e,d]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),ya=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):ya?!1:!0}else X=!1;X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+
d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function za(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function Aa(a){this.f=a;this.a=[];this.c={}}
var Ba={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ca={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Da={i:"i",italic:"i",n:"n",normal:"n"},
Ea=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Fa(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Ea.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Da[l];n=n[1];if(null==n||""==n)n="4";else var r=Ca[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=Ba[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Ba[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Ga(a,b){this.c=a;this.a=b}var Ha={Arimo:!0,Cousine:!0,Tinos:!0};Ga.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new Aa(e);Fa(f);A(c,za(d),D(b));F(b,function(){a(f.a,f.c,Ha)})};function Ia(a,b){this.c=a;this.a=b}Ia.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ja(a,b){this.c=a;this.f=b;this.a=[]}Ja.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ja(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ia(b,a)};Y.a.c.google=function(a,b){return new Ga(b,a)};var Z={load:p(Y.load,Y)}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Z}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _amountBtns = __webpack_require__(276);

var _amountBtns2 = _interopRequireDefault(_amountBtns);

var _clean_inputs = __webpack_require__(163);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var amount = _react2.default.createClass({
  displayName: 'amount',
  getDefaultProps: function getDefaultProps() {
    return { texts: {}, amount: 30 };
  },
  changeAmount: function changeAmount(amount, e) {
    if (e) e.preventDefault();
    var el = this.amountInput;
    if (amount == 5) el.focus();
    this.props.onChange({ amount: amount });
  },
  handleAmount: function handleAmount(e) {
    var val = e.currentTarget.value;
    var amount = (0, _clean_inputs.onlyNum)(val);
    this.props.onChange({ amount: amount });
  },
  changeType: function changeType(donation_type, e) {
    if (e) e.preventDefault();
    this.props.onChange({ donation_type: donation_type });
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        texts = _props.texts,
        donation_type = _props.donation_type,
        amount = _props.amount;


    return _react2.default.createElement(
      'div',
      { style: { width: this.props.width, float: 'left', padding: '1px' } },
      _react2.default.createElement(_amountBtns2.default, { texts: texts, changeAmount: this.changeAmount }),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'form-group form-group--addon col-7-l' },
          _react2.default.createElement(
            'span',
            { className: 'form-group__addon' },
            'USD'
          ),
          _react2.default.createElement('input', {
            ref: function ref(amountInput) {
              return _this.amountInput = amountInput;
            },
            className: 'form-control',
            type: 'text',
            onChange: this.handleAmount,
            value: amount
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group col-5-l' },
          _react2.default.createElement(
            'a',
            {
              href: '#',
              onClick: this.changeType.bind(null, 'monthly'),
              className: donation_type == 'monthly' ? 'donate_react__type donate_react__type--active' : 'donate_react__type '
            },
            texts.monthly
          ),
          _react2.default.createElement(
            'a',
            {
              href: '#',
              onClick: this.changeType.bind(null, 'once'),
              className: donation_type == 'once' ? 'donate_react__type donate_react__type--active' : 'donate_react__type '
            },
            texts.once
          )
        )
      )
    );
  }
});

exports.default = amount;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmountBtns = _react2.default.createClass({
  displayName: "AmountBtns",
  render: function render() {
    var _props = this.props,
        changeAmount = _props.changeAmount,
        texts = _props.texts;


    return _react2.default.createElement(
      "ul",
      { className: "change-amount", style: { padding: 0 } },
      _react2.default.createElement(
        "li",
        { className: "col-1-4" },
        _react2.default.createElement(
          "a",
          { href: "#", onClick: changeAmount.bind(null, 10) },
          "$10"
        )
      ),
      _react2.default.createElement(
        "li",
        { className: "col-1-4" },
        _react2.default.createElement(
          "a",
          { href: "#", onClick: changeAmount.bind(null, 30) },
          "$30"
        )
      ),
      _react2.default.createElement(
        "li",
        { className: "col-1-4" },
        _react2.default.createElement(
          "a",
          { href: "#", onClick: changeAmount.bind(null, 50) },
          "$50"
        )
      ),
      _react2.default.createElement(
        "li",
        { className: "col-1-4" },
        _react2.default.createElement(
          "a",
          { href: "#", onClick: changeAmount.bind(null, 100) },
          "$100"
        )
      ),
      _react2.default.createElement(
        "li",
        { className: "col-1-4" },
        _react2.default.createElement(
          "a",
          { href: "#", onClick: changeAmount.bind(null, 5) },
          texts.other
        )
      )
    );
  }
});

exports.default = AmountBtns;

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cards = _react2.default.createClass({
  displayName: 'Cards',
  cardType: function cardType(type) {
    return this.props.stripe.card_type == type ? 'card-type card-type--active' : 'card-type';
  },
  render: function render() {
    var texts = this.props.texts;


    return _react2.default.createElement(
      'div',
      { className: 'form-group donate_landing__cards' },
      _react2.default.createElement('img', {
        className: this.cardType('visa'),
        src: texts.template_uri + '/public/img/cards/Visa.png'
      }),
      _react2.default.createElement('img', {
        className: this.cardType('master-card'),
        src: texts.template_uri + '/public/img/cards/MasterCard.png'
      }),
      _react2.default.createElement('img', {
        className: this.cardType('diners-club'),
        src: texts.template_uri + '/public/img/cards/DinersClub.png'
      }),
      _react2.default.createElement('img', {
        className: this.cardType('american-express'),
        src: texts.template_uri + '/public/img/cards/AmericanExpress.png'
      }),
      _react2.default.createElement('img', {
        className: this.cardType('discover'),
        src: texts.template_uri + '/public/img/cards/Discover.png'
      })
    );
  }
});

exports.default = Cards;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _isEmail = __webpack_require__(237);

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isEmpty = __webpack_require__(238);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Contact = _react2.default.createClass({
  displayName: 'Contact',
  getDefaultProps: function getDefaultProps() {
    return { contact: {}, countries: [], errors: { contact: {} }, texts: {} };
  },
  validate: function validate(field) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var valid = !(0, _isEmpty2.default)(val);
    if (field == 'email') valid = (0, _isEmail2.default)(val);
    var contact = _extends({}, this.props.errors.contact, _defineProperty({}, field, valid));
    return _extends({}, this.props.errors, { contact: contact });
  },
  handleChange: function handleChange(field, e) {
    var val = e.currentTarget.value;
    var errors = this.validate(field, val);

    this.props.onChange({
      contact: _extends({}, this.props.contact, _defineProperty({}, field, val)),
      errors: errors
    });
  },
  showErr: function showErr(field) {
    return this.props.errors.contact[field] == false ? 'form-group__error' : 'hidden';
  },
  inputErrStyle: function inputErrStyle(field) {
    return this.props.errors.contact[field] == false ? 'form-group--error' : '';
  },
  validateAll: function validateAll() {
    var _props = this.props,
        contact = _props.contact,
        texts = _props.texts;

    var name = this.validate('name', contact.name);
    var email = this.validate('email', contact.email);
    var country = contact.country || texts.country;
    var countryValidation = this.validate('country', country);

    var errors = _extends({}, this.props.errors, {
      contact: _extends({}, name.contact, email.contact, countryValidation.contact)
    });

    this.props.onChange({ errors: errors });
    return errors;
  },
  render: function render() {
    var _props2 = this.props,
        texts = _props2.texts,
        contact = _props2.contact;


    return _react2.default.createElement(
      'div',
      { style: { width: this.props.width, float: 'left', padding: '1px' } },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'form-group col-12-l' },
          _react2.default.createElement('input', {
            type: 'text',
            className: 'form-control ' + this.inputErrStyle('name'),
            placeholder: texts.placeholder_name,
            onChange: this.handleChange.bind(null, 'name'),
            value: contact.name
          }),
          _react2.default.createElement(
            'span',
            { className: this.showErr('name') },
            texts.validation_name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group col-12-l' },
          _react2.default.createElement('input', {
            type: 'text',
            className: 'form-control ' + this.inputErrStyle('email'),
            placeholder: texts.placeholder_email,
            onChange: this.handleChange.bind(null, 'email'),
            value: contact.email
          }),
          _react2.default.createElement(
            'span',
            { className: this.showErr('email') },
            texts.validation_email
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group col-12-l' },
          _react2.default.createElement(
            'select',
            {
              type: 'text',
              className: 'form-control',
              placeholder: texts.placeholder_country,
              onChange: this.handleChange.bind(null, 'country'),
              value: contact.country || texts.country
            },
            this.props.countries.map(function (country, i) {
              return _react2.default.createElement(
                'option',
                { key: i, value: country },
                country
              );
            })
          )
        )
      )
    );
  }
});

exports.default = Contact;

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _cardValidator = __webpack_require__(287);

var _cardValidator2 = _interopRequireDefault(_cardValidator);

var _cards = __webpack_require__(277);

var _cards2 = _interopRequireDefault(_cards);

var _clean_inputs = __webpack_require__(163);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CedritCard = _react2.default.createClass({
  displayName: 'CedritCard',
  getDefaultProps: function getDefaultProps() {
    return { texts: {}, stripe: {}, errors: {} };
  },
  validateCard: function validateCard(card) {
    var number = _cardValidator2.default.number(card).isValid;
    return this.updateErrors({ number: number });
  },
  validateExpiry: function validateExpiry(month, year) {
    var valid = _cardValidator2.default.expirationDate({ month: month, year: year });
    var exp_month = valid.isValid;
    var exp_year = valid.isValid;
    return this.updateErrors({ exp_month: exp_month, exp_year: exp_year });
  },
  validateCvc: function validateCvc(cvc) {
    cvc = cvc.length >= 3;
    return this.updateErrors({ cvc: cvc });
  },
  getCardType: function getCardType(cardNum) {
    return _cardValidator2.default.number(cardNum).card ? _cardValidator2.default.number(cardNum).card.type : null;
  },
  updateErrors: function updateErrors(field) {
    return _extends({}, this.props.errors, { stripe: field });
  },
  handleCard: function handleCard(e) {
    var val = e.currentTarget.value;
    var number = (0, _clean_inputs.onlyNum)(val);
    number = (0, _clean_inputs.maxLength)(number, 16);
    var errors = this.validateCard(number);
    var card_type = this.getCardType(number);
    var stripe = _extends({}, this.props.stripe, { number: number, card_type: card_type });
    this.props.onChange({ stripe: stripe, errors: errors });
  },
  handleExpiry: function handleExpiry(type, e) {
    var stripe = this.props.stripe;

    var val = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
    val = (0, _clean_inputs.maxLength)(val, 2);
    var exp_month = stripe.exp_month;
    var exp_year = stripe.exp_year;
    if (type == 'exp_month') exp_month = val;
    if (type == 'exp_year') exp_year = val;
    var errors = this.validateExpiry(exp_month, exp_year);
    stripe = _extends({}, stripe, { exp_month: exp_month, exp_year: exp_year });

    this.props.onChange({ stripe: stripe, errors: errors });
  },
  handleCvc: function handleCvc(e) {
    var stripe = this.props.stripe;

    var cvc = (0, _clean_inputs.onlyNum)(e.currentTarget.value);
    cvc = (0, _clean_inputs.maxLength)(cvc, 4);
    stripe = _extends({}, stripe, { cvc: cvc });
    var errors = this.validateCvc(cvc);
    this.props.onChange({ stripe: stripe, errors: errors });
  },
  showErr: function showErr(field) {
    if (this.props.errors.stripe) {
      return this.props.errors.stripe[field] == false ? 'form-group__error' : 'hidden';
    }

    return '';
  },
  inputErrStyle: function inputErrStyle(field) {
    if (this.props.errors.stripe) {
      return this.props.errors.stripe[field] == false ? 'form-group--error' : '';
    }

    return '';
  },
  allValidations: function allValidations(e) {
    if (e) e.preventDefault();
    var stripe = this.props.stripe;

    var number = this.validateCard(stripe.number);
    var exp_month = this.validateExpiry(stripe.exp_month, stripe.exp_year);
    var cvc = this.validateCvc(stripe.cvc);

    var errors = _extends({}, this.props.errors, {
      stripe: _extends({}, number.stripe, exp_month.stripe, cvc.stripe)
    });

    this.props.onChange({ errors: errors });
    return errors;
  },
  render: function render() {
    var _props = this.props,
        texts = _props.texts,
        stripe = _props.stripe,
        errors = _props.errors;


    return _react2.default.createElement(
      'div',
      {
        className: 'donate_react__creditcard',
        style: { width: this.props.width, float: 'left', padding: '1px' }
      },
      _react2.default.createElement(_cards2.default, this.props),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: texts.placeholder_credit_card,
          className: 'form-control ' + this.inputErrStyle('number'),
          onChange: this.handleCard,
          value: stripe.number
        }),
        _react2.default.createElement(
          'span',
          { className: this.showErr('number') },
          texts.validation_card
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row donate_react__creditcard__row' },
        _react2.default.createElement(
          'div',
          { className: 'form-group col-4-l col-4' },
          _react2.default.createElement('input', {
            type: 'text',
            placeholder: texts.placeholder_month,
            className: 'form-control',
            onChange: this.handleExpiry.bind(null, 'exp_month'),
            value: stripe.exp_month
          }),
          _react2.default.createElement(
            'span',
            { className: this.showErr('exp_month') },
            texts.validation_month
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group col-4-l col-4' },
          _react2.default.createElement('input', {
            type: 'text',
            placeholder: texts.placeholder_year,
            className: 'form-control',
            onChange: this.handleExpiry.bind(null, 'exp_year'),
            value: stripe.exp_year
          }),
          _react2.default.createElement(
            'span',
            { className: this.showErr('exp_year') },
            texts.validation_year
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group col-4-l col-4' },
          _react2.default.createElement('input', {
            type: 'text',
            placeholder: texts.placeholder_cvc,
            className: 'form-control',
            onChange: this.handleCvc,
            value: stripe.cvc
          }),
          _react2.default.createElement(
            'span',
            { className: this.showErr('cvc') },
            texts.validation_cvc
          )
        )
      )
    );
  }
});

exports.default = CedritCard;

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _videoModal = __webpack_require__(162);

var _videoModal2 = _interopRequireDefault(_videoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerSlide = _react2.default.createClass({
  displayName: 'headerSlide',
  handleLink: function handleLink(e) {
    e.preventDefault();
    if (this.props.is_video) return this.modal.show();
    window.location.href = this.props.url;
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        image = _props.image,
        image_position = _props.image_position,
        title = _props.title,
        subtitle = _props.subtitle,
        url = _props.url,
        width = _props.width,
        height = _props.height;


    var bg = 'url(' + image + ')';

    var style = {
      backgroundImage: bg,
      backgroundPosition: image_position,
      width: width,
      height: height
    };

    return _react2.default.createElement(
      'div',
      null,
      this.props.is_video ? _react2.default.createElement(_videoModal2.default, { ref: function ref(modal) {
          return _this.modal = modal;
        }, url: this.props.url }) : '',
      _react2.default.createElement(
        'div',
        { className: 'slider__slide', style: style },
        _react2.default.createElement('a', { href: '#', className: 'slider__slide__link-zone', onClick: this.handleLink }),
        _react2.default.createElement(
          'a',
          { href: this.props.anchor, className: 'slider__slide__anchor' },
          _react2.default.createElement(
            'svg',
            { width: '50px', height: '57px', viewBox: '178 602 20 27', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement(
              'defs',
              null,
              _react2.default.createElement('polyline', { id: 'path-1', points: '16.9743561 9.37612525 16.9743561 23.0775777 2.91233907 23.0775777' }),
              _react2.default.createElement(
                'mask',
                { id: 'mask-2', maskContentUnits: 'userSpaceOnUse', maskUnits: 'objectBoundingBox', x: '0', y: '0', width: '14.062017', height: '13.7014524', fill: 'white' },
                _react2.default.createElement('use', { xlinkHref: '#path-1' })
              ),
              _react2.default.createElement('polyline', { id: 'path-3', points: '16.9743561 3.23766371 16.9743561 16.9391162 2.91233907 16.9391162' }),
              _react2.default.createElement(
                'mask',
                { id: 'mask-4', maskContentUnits: 'userSpaceOnUse', maskUnits: 'objectBoundingBox', x: '0', y: '0', width: '14.062017', height: '13.7014524', fill: 'white' },
                _react2.default.createElement('use', { xlinkHref: '#path-3' })
              )
            ),
            _react2.default.createElement(
              'g',
              { id: 'Group-12', stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd', transform: 'translate(178.000000, 602.000000)' },
              _react2.default.createElement('use', { id: 'Rectangle', stroke: '#F1364E', mask: 'url(#mask-2)', strokeWidth: '4', transform: 'translate(9.943348, 16.226851) rotate(-315.000000) translate(-9.943348, -16.226851) ', xlinkHref: '#path-1' }),
              _react2.default.createElement('use', { id: 'Rectangle-Copy', stroke: '#F1364E', mask: 'url(#mask-4)', strokeWidth: '4', transform: 'translate(9.943348, 10.088390) rotate(-315.000000) translate(-9.943348, -10.088390) ', xlinkHref: '#path-3' })
            )
          )
        )
      )
    );
  }
});

exports.default = headerSlide;

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = _react2.default.createClass({
	displayName: 'Post',
	handleImageLoaded: function handleImageLoaded() {
		this.props.onImageLoaded();
	},
	getDefaultProps: function getDefaultProps() {
		return {
			post: {
				post_title: ''
			}
		};
	},
	render: function render() {
		var _props = this.props,
		    post = _props.post,
		    type = _props.type,
		    read_more = _props.read_more;

		var img = post.post_image ? _react2.default.createElement('img', { src: post.post_image, onLoad: this.handleImageLoaded }) : '';
		var title = post.post_title;
		if (window.innerWidth <= '767') {
			title = post.post_title.substring(0, 70) + '...';
		}

		return _react2.default.createElement(
			'div',
			{ className: type == 'main' ? 'grid-item grid-item--main' : 'grid-item' },
			_react2.default.createElement(
				'div',
				{ className: type == 'main' ? 'grid-item__content grid-item--main__content' : 'grid-item__content' },
				_react2.default.createElement(
					'a',
					{ href: post.post_permalink },
					img
				),
				_react2.default.createElement(
					'div',
					{
						className: type == 'main' ? 'grid-item__content__texts grid-item--main__content__texts' : 'grid-item__content__texts',
						style: img == '' ? { width: '100%' } : {}
					},
					_react2.default.createElement(
						'h5',
						null,
						_react2.default.createElement(
							'a',
							{ href: post.post_permalink },
							title
						)
					),
					_react2.default.createElement(
						'p',
						null,
						post.post_short + '...'
					),
					_react2.default.createElement(
						'a',
						{ href: post.post_permalink, className: 'grid-item__content__texts__readmore' },
						read_more,
						'...'
					)
				)
			)
		);
	}
});

exports.default = Post;

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(66);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoint = '/wp-admin/admin-ajax.php';

var PostsAbout = _react2.default.createClass({
	displayName: 'PostsAbout',
	getInitialState: function getInitialState() {
		return {
			posts: []
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps() {
		this.fetchPosts();
	},
	componentDidMount: function componentDidMount() {
		this.fetchPosts();
	},
	fetchPosts: function fetchPosts() {
		var _this = this;

		var data = _qs2.default.stringify({ action: 'get_posts', 'post_perpage': 4, 'post_category': this.props.category });

		_axios2.default.post(endpoint, data).then(function (res) {
			_this.setState({ posts: res.data });
		}).catch(function (err) {
			return console.error(err);
		});
	},
	render: function render() {
		var posts = this.state.posts;

		return _react2.default.createElement(
			'div',
			null,
			posts.map(function (post, i) {
				return _react2.default.createElement(
					'div',
					{ key: i, className: 'col-12 col-3-l' },
					_react2.default.createElement(
						'a',
						{ href: post.post_permalink, style: { background: '#fff' } },
						_react2.default.createElement('img', { src: post.post_image, alt: '', style: { width: '100%' } })
					),
					_react2.default.createElement(
						'div',
						{ className: 'post-about__title', style: { background: '#fff', padding: '20px' } },
						_react2.default.createElement(
							'h5',
							null,
							_react2.default.createElement(
								'a',
								{ style: { color: '#324049' }, href: post.post_permalink },
								post.post_title
							)
						)
					)
				);
			})
		);
	}
});

exports.default = PostsAbout;

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectsIcons = _react2.default.createClass({
  displayName: "ProjectsIcons",
  changeContent: function changeContent(num, e) {
    e.preventDefault();
    this.props.onChange(num);
  },
  render: function render() {
    return _react2.default.createElement(
      "ul",
      { className: "projects__icons" },
      _react2.default.createElement(
        "li",
        { id: "projects-1" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 1), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "68px", height: "67px", viewBox: "0 0 68 67", version: "1.1" },
            _react2.default.createElement("path", { d: "M67.3673112,32.026012 C67.2600797,30.6734635 66.0912564,29.6302188 64.6758007,29.6302188 L3.22679192,29.6302188 C1.81669775,29.6302188 0.647874444,30.6734635 0.540642948,32.026012 C0.513835074,32.3667703 -0.043768705,40.471576 6.54560672,47.2972274 C11.8750121,52.8227547 20.2015377,55.7952158 31.2517434,56.2146107 L31.2517434,61.006197 L21.5365699,61.006197 C20.0460521,61.006197 18.8396977,62.1647753 18.8396977,63.5959602 C18.8396977,65.0271452 20.0460521,66.1857235 21.5365699,66.1857235 L45.9102889,66.1857235 C47.4008067,66.1857235 48.6125226,65.0271452 48.6125226,63.5959602 C48.6125226,62.1647753 47.4008067,61.006197 45.9102889,61.006197 L36.6454876,61.006197 L36.6454876,56.2146107 C47.6956933,55.7952158 56.0275805,52.8227547 61.3569859,47.2972274 C67.9463613,40.471576 67.3941191,32.3667703 67.3673112,32.026012 L67.3673112,32.026012 Z M61.8395276,34.8097454 C61.5017484,37.0797201 60.4669644,40.5973945 57.4055052,43.7743106 C52.7034041,48.6445334 44.811166,51.1137206 33.9539771,51.1137206 C23.1450423,51.1137206 15.2796121,48.6655031 10.5667878,43.8424622 C7.45171286,40.6498188 6.40620578,37.0954474 6.06306499,34.8097454 L61.8395276,34.8097454 Z M46.6501862,13.3734255 C46.6501862,6.44292538 40.7846234,0.80206448 33.5679437,0.80206448 C26.351264,0.80206448 20.4803396,6.44292538 20.4803396,13.3734255 C20.4803396,20.3039256 26.351264,25.9447865 33.5679437,25.9447865 C40.7846234,25.9447865 46.6501862,20.3039256 46.6501862,13.3734255 L46.6501862,13.3734255 Z M41.256442,13.3734255 C41.256442,17.4467981 37.8089494,20.7600175 33.5679437,20.7600175 C29.326938,20.7600175 25.8740839,17.4467981 25.8740839,13.3734255 C25.8740839,9.30005288 29.326938,5.98683346 33.5679437,5.98683346 C37.8089494,5.98683346 41.256442,9.30005288 41.256442,13.3734255 L41.256442,13.3734255 Z", id: "Fill-7", stroke: "none", fill: "#B91325", fillRule: "evenodd" })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-2" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 2), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "115 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M167.517255,38.9955022 C167.707985,38.6134211 167.824284,38.3996377 167.828936,38.3905405 C168.359259,37.4034978 168.070837,36.1844773 167.14975,35.5294812 L159.00883,29.7436824 C158.338948,29.2660811 157.450425,29.1842065 156.692156,29.5208018 C156.231613,29.7300366 154.556909,30.6352048 152.663564,33.4416812 C150.146856,33.1323774 147.244037,32.9322397 144.201658,32.9322397 C141.131368,32.9322397 138.25646,33.1323774 135.749057,33.4416812 C133.855711,30.6352048 132.181008,29.7300366 131.720464,29.5208018 C130.962195,29.179658 130.073672,29.2615325 129.403791,29.7436824 L121.267522,35.5294812 C120.341783,36.1844773 120.053362,37.4034978 120.583685,38.3905405 C120.588337,38.3996377 120.695332,38.5997754 120.876758,38.9545649 C117.83438,41.3016343 115.196721,44.672135 115.196721,49.2798506 C115.196721,57.6674395 121.704806,57.6674395 127.654656,57.6674395 L160.962651,57.6674395 C164.135284,57.6674395 166.879937,57.6674395 169.098919,56.6940425 C171.834269,55.4886677 173.215899,52.9914951 173.215899,49.2798506 C173.215899,44.7039751 170.564285,41.3425715 167.517255,38.9955022 L167.517255,38.9955022 Z M124.979782,53.0551753 C120.47669,52.9187178 119.890544,52.2227844 119.890544,49.2798506 C119.890544,47.2056963 120.69068,44.9950845 122.728236,43.0573877 C123.109696,43.994396 123.50046,45.0269246 123.863313,46.1185847 C124.654145,48.488397 124.910003,51.1948044 124.979782,53.0551753 L124.979782,53.0551753 Z M136.921349,53.1779871 L129.594521,53.1779871 C129.524741,51.0174097 129.23632,47.7151377 128.240802,44.726718 C127.319715,41.9702761 126.263721,39.5777209 125.533364,38.0493967 L130.683078,34.3877866 C131.678596,35.4294124 133.283521,37.6263784 134.716323,41.8974988 C136.344507,46.7690322 136.80505,50.8491121 136.921349,53.1779871 L136.921349,53.1779871 Z M150.356194,37.7764817 C150.002646,38.604324 149.658401,39.5049436 149.32346,40.5056321 C147.504546,45.9366414 147.006787,50.4533853 146.885836,53.0870154 L141.526784,53.0870154 C141.410485,50.4533853 140.908074,45.9366414 139.08916,40.5056321 C138.754219,39.5049436 138.409975,38.604324 138.056426,37.7764817 C139.926512,37.6081841 141.964068,37.5126638 144.201658,37.5126638 C146.4439,37.5126638 148.481456,37.6081841 150.356194,37.7764817 L150.356194,37.7764817 Z M162.879256,38.0493967 C162.148899,39.5777209 161.092905,41.9702761 160.171818,44.726718 C159.1763,47.7151377 158.892531,51.0174097 158.822752,53.1779871 L151.491271,53.1779871 C151.60757,50.8491121 152.068113,46.7690322 153.696298,41.8974988 C155.138404,37.6036355 156.74798,35.411218 157.72489,34.3877866 L162.879256,38.0493967 Z M168.526729,49.2798506 C168.526729,51.9180293 167.642858,52.3046589 167.168358,52.5184424 C166.307747,52.8959749 164.967984,53.0187866 163.432839,53.0642725 C163.502618,51.2039016 163.753823,48.5020427 164.549308,46.1185847 C164.91216,45.0269246 165.302924,43.994396 165.684385,43.0573877 C167.726593,44.9996331 168.526729,47.2056963 168.526729,49.2798506 L168.526729,49.2798506 Z M158.725061,15.1973108 C158.725061,7.33280908 152.170456,0.9375 144.108619,0.9375 C136.051434,0.9375 129.492178,7.33280908 129.492178,15.1973108 C129.492178,23.0572639 136.051434,29.452573 144.108619,29.452573 C152.170456,29.452573 158.725061,23.0572639 158.725061,15.1973108 L158.725061,15.1973108 Z M154.026586,15.1973108 C154.026586,20.5327998 149.579318,24.8721489 144.108619,24.8721489 C138.637921,24.8721489 134.186,20.5327998 134.186,15.1973108 C134.186,9.85727319 138.637921,5.51792407 144.108619,5.51792407 C149.579318,5.51792407 154.026586,9.85727319 154.026586,15.1973108 L154.026586,15.1973108 Z",
              id: "Fill-10",
              stroke: "none",
              fill: "#00355F",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-3" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 3), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "226 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M284.41262,48.4019739 C284.398665,47.8243037 283.975337,34.0284485 276.662464,18.376771 C272.261715,8.97029932 266.483987,4.6582417 262.241405,2.6705105 C260.836515,1.91999414 259.282762,1.40600415 257.645274,1.14218628 C257.021912,1.02847168 256.61254,0.992083008 256.533456,0.987534424 L256.533456,1.00118018 C256.114781,0.964791504 255.700757,0.9375 255.272777,0.9375 C251.593081,0.9375 248.229718,2.28842944 245.661839,4.49449268 C241.986794,6.96892236 237.818643,11.1900083 234.459932,18.376771 C228.831067,30.4168728 227.286618,41.3334744 226.86329,46.0048701 C226.560913,47.0192043 226.393443,48.1108645 226.393443,49.2843992 C226.393443,57.671988 232.892223,57.671988 238.837421,57.671988 L272.108201,57.671988 C275.280834,57.671988 278.020835,57.671988 280.239817,56.6940425 C282.970515,55.4886677 284.352145,52.9960437 284.352145,49.2843992 C284.352145,48.979644 284.310277,48.6976318 284.287018,48.4065225 L284.41262,48.4019739 Z M265.186092,15.1973108 C265.186092,20.5327998 260.738823,24.8766975 255.272777,24.8766975 C249.80673,24.8766975 245.364113,20.5327998 245.364113,15.1973108 C245.364113,12.067885 246.917866,9.30689453 249.285711,7.53749536 C251.151145,6.43673804 252.742113,5.90910229 253.746936,5.67257593 C254.249347,5.59525 254.751758,5.51792407 255.272777,5.51792407 C260.738823,5.51792407 265.186092,9.86182178 265.186092,15.1973108 L265.186092,15.1973108 Z M238.642039,20.2416904 C239.311921,18.8088865 240.014366,17.5443801 240.735419,16.375394 C241.354129,23.6895171 247.634267,29.4571216 255.272777,29.4571216 C263.213663,29.4571216 269.67988,23.2301101 269.856654,15.5157117 C270.763786,16.8939326 271.643005,18.4586455 272.480357,20.2416904 C275.727421,27.1919268 277.527728,33.8101165 278.541854,38.9090791 C275.39248,36.5119753 271.866299,35.1883374 270.428845,34.733479 C267.591153,33.8283108 261.780861,32.9322397 255.370468,32.9322397 C248.969378,32.9322397 243.400989,33.7919221 240.316743,34.733479 C238.851377,35.1792402 235.622921,36.3891636 232.64567,38.5360952 C233.6691,33.4962642 235.464754,27.0372749 238.642039,20.2416904 L238.642039,20.2416904 Z M278.309256,52.5184424 C277.011361,53.091564 274.634212,53.091564 272.108201,53.091564 L238.637387,53.091564 C231.859489,53.091564 231.077961,52.7003857 231.077961,49.2843992 C231.077961,49.0296785 231.101221,48.7704092 231.129132,48.5065913 L231.301255,48.5111399 C231.301255,48.488397 231.319863,47.9880527 231.389642,47.0965303 C232.752665,42.2977742 238.967676,37.5126638 255.370468,37.5126638 C274.280663,37.5126638 279.667627,43.8670356 279.667627,49.2843992 C279.667627,51.9225779 278.783755,52.3092075 278.309256,52.5184424 L278.309256,52.5184424 Z",
              id: "Fill-5",
              stroke: "none",
              fill: "#6E5785",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-4" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 4), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "337 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M395.609342,49.2843992 C395.609342,39.9279619 384.51443,35.6386472 381.672086,34.733479 C378.829741,33.8283108 373.014798,32.9322397 366.595101,32.9322397 C360.189359,32.9322397 354.616318,33.7964707 351.52742,34.733479 C348.443174,35.6704873 337.590164,39.9279619 337.590164,49.2843992 C337.590164,57.671988 344.098248,57.671988 350.048098,57.671988 L383.351441,57.671988 C386.528726,57.671988 389.27338,57.671988 391.492362,56.6940425 C394.227711,55.4886677 395.609342,52.9960437 395.609342,49.2843992 M390.91552,49.2843992 C390.91552,51.9225779 390.031648,52.3092075 389.561801,52.5184424 C388.263905,53.091564 385.877453,53.091564 383.351441,53.091564 L349.843412,53.091564 C343.060863,53.091564 342.279334,52.7003857 342.279334,49.2843992 C342.279334,43.8670356 347.666298,37.5126638 366.595101,37.5126638 C385.523904,37.5126638 390.91552,43.8670356 390.91552,49.2843992 M381.113851,15.1973108 C381.113851,7.33280908 374.559247,0.9375 366.502062,0.9375 C358.444876,0.9375 351.88562,7.33280908 351.88562,15.1973108 C351.88562,23.0618125 358.444876,29.4571216 366.502062,29.4571216 C374.559247,29.4571216 381.113851,23.0618125 381.113851,15.1973108 M376.420029,15.1973108 C376.420029,20.5327998 371.968108,24.8766975 366.502062,24.8766975 C361.026711,24.8766975 356.579443,20.5327998 356.579443,15.1973108 C356.579443,9.86182178 361.026711,5.51792407 366.502062,5.51792407 C371.968108,5.51792407 376.420029,9.86182178 376.420029,15.1973108",
              id: "Fill-3",
              stroke: "none",
              fill: "#8B97A6",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-5" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 5), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "448 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M487.667922,57.6674395 L455.457788,57.6674395 C452.140945,57.6674395 448.786885,55.2475928 448.786885,50.6262314 C448.786885,49.3480793 449.066003,48.247322 449.526546,47.3194109 C454.108721,33.9283796 462.789269,8.46540649 463.380067,6.28663477 C464.370933,2.58863599 467.631953,0.9375 470.418474,0.9375 L495.42273,0.9375 C497.176517,0.9375 498.851221,1.79718237 499.92117,3.24363208 C501.107419,4.85383081 501.39584,6.94617944 500.702699,8.98849365 C499.772308,11.7267412 492.743204,37.6946072 491.738382,41.5427092 C490.691692,45.5409146 487.556275,47.9243726 483.35556,47.9243726 L455.760165,47.9243726 C455.746209,47.9243726 454.471574,48.0153442 453.8203,49.0979072 C453.769129,49.220719 453.713305,49.3389822 453.648178,49.4526968 C453.522575,49.7710977 453.443492,50.1577273 453.443492,50.6262314 C453.443492,52.9369121 454.983289,53.1188555 455.457788,53.1188555 L487.667922,53.1188555 C489.705478,53.1188555 492.031455,52.2910132 492.626905,50.4397395 C493.054885,49.1524902 499.70718,25.5134993 502.233192,16.5164001 C502.572784,15.3064768 503.838116,14.583252 505.094144,14.9243958 C506.336216,15.2564424 507.066573,16.5118516 506.72698,17.7217749 C506.350172,19.0454128 497.599845,50.1895674 497.060218,51.822509 C495.915837,55.3704045 492.222185,57.6674395 487.667922,57.6674395 M455.783425,43.3757886 L483.35556,43.3757886 C485.411724,43.3757886 486.714271,42.3751001 487.230638,40.4101118 C488.174985,36.7939875 495.287823,10.4986235 496.283342,7.55114111 C496.506636,6.90524219 496.455464,6.32302344 496.148435,5.90455371 C495.953053,5.64528442 495.678588,5.48608398 495.42273,5.48608398 L470.418474,5.48608398 C470.083533,5.48608398 468.380918,5.58160425 467.883159,7.44652368 C467.278405,9.67987842 459.495685,32.5092214 455.783425,43.3757886",
              id: "Fill-1",
              stroke: "none",
              fill: "#005921",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-6" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 6), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "558 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M616.051965,55.2748843 C616.051965,53.9512463 615.028535,52.8777805 613.763203,52.8777805 L589.331137,52.8777805 L589.331137,46.5552488 C597.458102,45.5409146 605.436204,39.2092856 605.436204,29.4889617 L605.436204,21.6335571 C605.436204,20.3099192 604.408122,19.241002 603.147443,19.241002 C601.882111,19.241002 600.858681,20.3099192 600.858681,21.6335571 L600.858681,29.4889617 C600.858681,37.1624229 593.690019,41.9156931 587.042376,41.9156931 C580.394733,41.9156931 573.226071,37.1624229 573.226071,29.4889617 L573.226071,21.6335571 C573.226071,20.3099192 572.202641,19.241002 570.937309,19.241002 C569.676629,19.241002 568.648547,20.3099192 568.648547,21.6335571 L568.648547,29.4889617 C568.648547,39.2092856 576.626649,45.5409146 584.753614,46.5552488 L584.753614,52.8777805 L560.316897,52.8777805 C559.056217,52.8777805 558.032787,53.9512463 558.032787,55.2748843 C558.032787,56.5985222 559.056217,57.6674395 560.316897,57.6674395 L613.763203,57.6674395 C615.028535,57.6674395 616.051965,56.5985222 616.051965,55.2748843 L616.051965,55.2748843 Z M597.146421,27.3010928 L597.146421,11.5948323 C597.146421,5.71806177 592.615417,0.9375 587.042376,0.9375 C581.469334,0.9375 576.93833,5.71806177 576.93833,11.5948323 L576.93833,27.3010928 C576.93833,33.1778633 581.469334,37.958425 587.042376,37.958425 C592.615417,37.958425 597.146421,33.1778633 597.146421,27.3010928 L597.146421,27.3010928 Z M592.57355,27.3010928 C592.57355,30.5396846 590.089406,33.1687661 587.042376,33.1687661 C583.995346,33.1687661 581.515854,30.5396846 581.515854,27.3010928 L581.515854,11.5948323 C581.515854,8.36078906 583.995346,5.72715894 587.042376,5.72715894 C590.089406,5.72715894 592.57355,8.36078906 592.57355,11.5948323 L592.57355,27.3010928 Z",
              id: "Fill-19",
              stroke: "none",
              fill: "#689038",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-7" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 7), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "671 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M729.204158,29.3024697 C729.204158,13.8099927 719.351318,1.1922207 707.172501,0.96024292 L707.172501,0.9375 L693.55623,0.9375 C681.219246,0.9375 671.180328,13.664438 671.180328,29.3024697 C671.180328,44.9405015 681.219246,57.6674395 693.55623,57.6674395 L706.8143,57.6674395 L706.832908,57.6674395 C719.169892,57.6674395 729.204158,44.9405015 729.204158,29.3024697 L729.204158,29.3024697 Z M694.812257,5.42240381 C688.597246,10.4667834 684.461658,19.272842 684.461658,29.3024697 C684.461658,39.3275488 688.597246,48.138156 694.807605,53.1825356 L693.55623,53.1825356 C683.726649,53.1825356 675.734591,42.4706204 675.734591,29.3024697 C675.734591,16.1343191 683.726649,5.42240381 693.55623,5.42240381 L694.812257,5.42240381 Z M724.649894,29.3024697 C724.649894,42.4706204 716.657836,53.1870842 706.832908,53.1870842 L706.832908,53.1825356 L706.8143,53.1825356 C696.998676,53.1734385 689.015922,42.4660718 689.015922,29.3024697 C689.015922,16.1343191 697.00798,5.42240381 706.832908,5.42240381 C716.657836,5.42240381 724.649894,16.1343191 724.649894,29.3024697 L724.649894,29.3024697 Z M721.072541,29.3024697 C721.072541,19.1818704 715.341333,11.2491399 708.02846,11.2491399 C700.715588,11.2491399 694.989032,19.1818704 694.989032,29.3024697 C694.989032,39.4276177 700.715588,47.3557996 708.02846,47.3557996 C715.341333,47.3557996 721.072541,39.4276177 721.072541,29.3024697 L721.072541,29.3024697 Z M716.518277,29.3024697 C716.518277,36.65753 712.629243,42.8708958 708.02846,42.8708958 C703.427677,42.8708958 699.543295,36.65753 699.543295,29.3024697 C699.543295,21.9474094 703.427677,15.7340437 708.02846,15.7340437 C712.629243,15.7340437 716.518277,21.9474094 716.518277,29.3024697 L716.518277,29.3024697 Z",
              id: "Fill-12-Copy",
              stroke: "none",
              fill: "#7A2D04",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-8" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 8), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "784 0 59 58", version: "1.1" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", {
              d: "M842.347047,44.1308535 L842.347047,43.020999 L841.458523,42.3296143 C834.196822,36.7166616 830.033323,27.801437 830.033323,17.8809753 C830.033323,11.2536885 824.734747,6.08194849 819.319871,5.00393408 C819.115185,2.23839502 815.356406,0.9375 813.337458,0.9375 C811.323161,0.9375 807.94119,2.23839502 807.596946,4.86747656 C801.702919,6.28208618 796.646245,11.2536885 796.646245,17.8809753 C796.646245,27.801437 792.478093,36.712113 785.21174,42.3296143 L784.327869,43.020999 L784.327869,44.1308535 C784.327869,47.460417 787.212081,50.1668245 790.75687,50.1668245 L803.089202,50.1668245 C804.201019,54.4697849 808.378474,57.6674395 813.337458,57.6674395 C818.301093,57.6674395 822.469245,54.4697849 823.581062,50.1668245 L835.913393,50.1668245 C839.462835,50.1668245 842.347047,47.460417 842.347047,44.1308535 M837.374107,44.9495986 C837.043818,45.3316797 836.49954,45.590949 835.913393,45.590949 L819.22218,45.590949 L819.22218,47.8834353 C819.22218,50.7535918 816.57987,53.091564 813.337458,53.091564 C810.090393,53.091564 807.452735,50.7535918 807.452735,47.8834353 L807.452735,45.590949 L790.75687,45.590949 C790.170724,45.590949 789.631097,45.3316797 789.300808,44.9495986 C796.948622,38.4314778 801.298199,28.6565708 801.298199,17.8809753 C801.298199,11.2491399 808.085401,9.56616382 811.006828,9.14314551 C811.016132,8.94300781 811.239426,5.5088269 813.421193,5.5088269 C815.60296,5.5088269 815.668087,8.94300781 815.668087,9.14314551 C818.584863,9.56616382 825.376716,11.2491399 825.376716,17.8809753 C825.376716,28.6565708 829.726294,38.4314778 837.374107,44.9495986",
              id: "Fill-17",
              stroke: "none",
              fill: "#B27008",
              fillRule: "evenodd"
            })
          )
        )
      ),
      _react2.default.createElement(
        "li",
        { id: "projects-9" },
        _react2.default.createElement(
          "a",
          { onClick: this.changeContent.bind(null, 9), href: "#" },
          _react2.default.createElement(
            "svg",
            { width: "59px", height: "58px", viewBox: "0 0 59 58", version: "1.1", className: "flag" },
            _react2.default.createElement("defs", null),
            _react2.default.createElement("path", { d: "M58.5115248,27.9103081 L41.6156257,1.62404126 C41.2481213,0.99633667 40.6014996,0.573318359 39.8711427,0.48234668 C39.1361339,0.395923584 38.405777,0.636998535 37.8894101,1.15553711 L14.5877695,26.7640649 C14.3598237,26.9960427 14.2063092,27.2689578 14.0946623,27.55097 C14.0760545,27.5873586 14.0434908,27.6101016 14.024883,27.6464902 L1.008714,53.9373057 C0.478391173,55.1017432 1.01336595,56.4754155 2.20426633,56.9939541 C2.51594729,57.1304116 2.84158411,57.1940918 3.16256898,57.1940918 C4.06504817,57.1940918 4.92565977,56.6846504 5.32107591,55.8204194 L16.5322865,33.5050664 L300.0927342,55.9978142 C30.4602386,56.6300674 31.1068603,57.0530857 31.8418691,57.1440574 C31.9395602,57.1577031 32.0419032,57.1668003 32.1395942,57.1668003 C32.77226,57.1668003 33.3816661,56.9166282 33.8282537,56.4663184 L58.1533243,30.6803958 C58.8929851,29.9389766 59.0371957,28.8063792 58.5115248,27.9103081 L58.5115248,27.9103081 Z M32.6327014,51.0307605 L19.2071604,28.7608933 L39.0756585,6.5819978 L53.5339334,28.7017617 L32.6327014,51.0307605 Z", id: "Fill-14", stroke: "none", fill: "#E0AB00", fillRule: "evenodd" })
          )
        )
      )
    );
  }
});

exports.default = ProjectsIcons;

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isObject(obj) {
  return obj === Object(obj);
}

var appendValues = function appendValues(obj, formData, arrName) {
  Object.keys(obj).forEach(function (key) {
    if (isObject(obj[key])) {
      return appendValues(obj[key], formData, key);
    } else if (typeof arrName == 'string') {
      formData.append(arrName + '[' + key + ']', obj[key]);
    } else {
      formData.append(key, obj[key]);
    }
  });

  return formData;
};

var objToFormData = function objToFormData(ob) {
  var data = new FormData();

  data = appendValues(ob, data);

  // Object.keys(ob).forEach(key => {
  // 	if(typeof ob[key] == 'object') {
  // 		Object.keys(ob[key]).forEach(subkey => {
  // 			data.append(`${key}[subkey]`, ob[key][subkey]);
  // 		});
  // 	}
  // 	data.append(key, ob[key]);
  // });
  return data;
};

exports.default = objToFormData;

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendTransaction;
function sendTransaction(order) {
  return new Promise(function (resolve) {

    var timeout = setTimeout(function () {
      console.log('Google analytics transaction timed out');
      resolve();
    }, 3000);

    var hits = 1; // items + transaction
    var hitCallback = function hitCallback() {
      hits -= 1;
      if (hits === 0) {
        clearTimeout(timeout); // clear the timeout so promise doesn't resolve twice
        console.log('Google analytics transaction sent');
        resolve();
      }
    };

    ga('require', 'ecommerce');
    ga('ecommerce:addTransaction', {
      id: order.id,
      revenue: order.amount,
      currency: 'USD',
      hitCallback: hitCallback });

    ga('ecommerce:send');
  })
  // handle a hard failure conditions gracefully (ie: ga didn't load)
  .catch(function (ex) {
    console.log('Error sending Google analytics transaction');
    console.log(ex);
  });
}

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  number: __webpack_require__(288),
  expirationDate: __webpack_require__(290),
  expirationMonth: __webpack_require__(165),
  expirationYear: __webpack_require__(101),
  cvv: __webpack_require__(289),
  postalCode: __webpack_require__(294)
};


/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var luhn10 = __webpack_require__(292);
var getCardTypes = __webpack_require__(476);

function verification(card, isPotentiallyValid, isValid) {
  return {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid};
}

function cardNumber(value) {
  var potentialTypes, cardType, isPotentiallyValid, isValid, i, maxLength;

  if (typeof value === 'number') {
    value = String(value);
  }

  if (typeof value !== 'string') { return verification(null, false, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  potentialTypes = getCardTypes(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  cardType = potentialTypes[0];

  if (cardType.type === 'unionpay') {  // UnionPay is not Luhn 10 compliant
    isValid = true;
  } else {
    isValid = luhn10(value);
  }

  maxLength = Math.max.apply(null, cardType.lengths);

  for (i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      isPotentiallyValid = value.length !== maxLength || isValid;
      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, value.length < maxLength, false);
}

module.exports = cardNumber;


/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DEFAULT_LENGTH = 3;

function includes(array, thing) {
  var i = 0;

  for (; i < array.length; i++) {
    if (thing === array[i]) { return true; }
  }

  return false;
}

function max(array) {
  var maximum = DEFAULT_LENGTH;
  var i = 0;

  for (; i < array.length; i++) {
    maximum = array[i] > maximum ? array[i] : maximum;
  }

  return maximum;
}

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function cvv(value, maxLength) {
  maxLength = maxLength || DEFAULT_LENGTH;
  maxLength = maxLength instanceof Array ? maxLength : [maxLength];

  if (typeof value !== 'string') { return verification(false, false); }
  if (!/^\d*$/.test(value)) { return verification(false, false); }
  if (includes(maxLength, value.length)) { return verification(true, true); }
  if (value.length < Math.min.apply(null, maxLength)) { return verification(false, true); }
  if (value.length > max(maxLength)) { return verification(false, false); }

  return verification(true, true);
}

module.exports = cvv;


/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseDate = __webpack_require__(293);
var expirationMonth = __webpack_require__(165);
var expirationYear = __webpack_require__(101);

function verification(isValid, isPotentiallyValid, month, year) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year
  };
}

function expirationDate(value) {
  var date, monthValid, yearValid, isValidForThisYear;

  if (typeof value === 'string') {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
    date = parseDate(value);
  } else if (value !== null && typeof value === 'object') {
    date = {
      month: String(value.month),
      year: String(value.year)
    };
  } else {
    return verification(false, false, null, null);
  }

  monthValid = expirationMonth(date.month);
  yearValid = expirationYear(date.year);

  if (monthValid.isValid) {
    if (yearValid.isCurrentYear) {
      isValidForThisYear = monthValid.isValidForThisYear;
      return verification(isValidForThisYear, isValidForThisYear, date.month, date.year);
    }

    if (yearValid.isValid) {
      return verification(true, true, date.month, date.year);
    }
  }

  if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
    return verification(false, true, null, null);
  }

  return verification(false, false, null, null);
}

module.exports = expirationDate;


/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.

module.exports = Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};


/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Luhn algorithm implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


function luhn10(identifier) {
  var sum = 0;
  var alt = false;
  var i = identifier.length - 1;
  var num;

  while (i >= 0) {
    num = parseInt(identifier.charAt(i), 10);

    if (alt) {
      num *= 2;
      if (num > 9) {
        num = (num % 10) + 1; // eslint-disable-line no-extra-parens
      }
    }

    alt = !alt;

    sum += num;

    i--;
  }

  return sum % 10 === 0;
}

module.exports = luhn10;


/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var expirationYear = __webpack_require__(101);
var isArray = __webpack_require__(291);

function parseDate(value) {
  var month, len, year, yearValid;

  if (/\//.test(value)) {
    value = value.split(/\s*\/\s*/g);
  } else if (/\s/.test(value)) {
    value = value.split(/ +/g);
  }

  if (isArray(value)) {
    return {
      month: value[0],
      year: value.slice(1).join()
    };
  }

  len = value[0] === '0' || value.length > 5 ? 2 : 1;

  if (value[0] === '1') {
    year = value.substr(1);
    yearValid = expirationYear(year);
    if (!yearValid.isPotentiallyValid) {
      len = 2;
    }
  }

  month = value.substr(0, len);

  return {
    month: month,
    year: value.substr(month.length)
  };
}

module.exports = parseDate;


/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MIN_POSTAL_CODE_LENGTH = 3;

function verification(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function postalCode(value) {
  if (typeof value !== 'string') {
    return verification(false, false);
  } else if (value.length < MIN_POSTAL_CODE_LENGTH) {
    return verification(false, true);
  }

  return verification(true, true);
}

module.exports = postalCode;


/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var testOrder = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(x) {
  var prefixPattern, exactPattern, dupe;

  if (!x) { return null; }

  prefixPattern = x.prefixPattern.source;
  exactPattern = x.exactPattern.source;
  dupe = JSON.parse(JSON.stringify(x));
  dupe.prefixPattern = prefixPattern;
  dupe.exactPattern = exactPattern;

  return dupe;
}

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'MasterCard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27[0-1]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^(6|62)$/,
  exactPattern: /^62\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^5[06-9]\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = types[type];

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(types[type]);
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

module.exports = creditCardType;


/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(200),
    getRawTag = __webpack_require__(518),
    objectToString = __webpack_require__(519);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(200);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 519:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 520:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(516),
    isObjectLike = __webpack_require__(520);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(201);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(202),
    isSymbol = __webpack_require__(521);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license Minigrid v3.1.1 – minimal cascading grid layout http://alves.im/minigrid */
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Minigrid = factory();
  }

}(this, function(exports){
  'use strict';

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  var Minigrid = function(props) {
    var containerEle = props.container instanceof Node ? (
      props.container
    ) : (
      document.querySelector(props.container)
    );

    var itemsNodeList = props.item instanceof NodeList ?
      props.item : containerEle.querySelectorAll(props.item);

    this.props = extend(props, {
      container: containerEle,
      nodeList: itemsNodeList
    });

  }

  Minigrid.prototype.mount = function() {
    if (!this.props.container) {
      return false;
    }
    if (!this.props.nodeList || this.props.nodeList.length === 0) {
      return false;
    }
    var gutter = (
      typeof this.props.gutter === 'number' &&
      isFinite(this.props.gutter) &&
      Math.floor(this.props.gutter) === this.props.gutter
    ) ? this.props.gutter : 0;

    var done = this.props.done;
    var containerEle = this.props.container;
    var itemsNodeList = this.props.nodeList;

    containerEle.style.width = '';

    var forEach = Array.prototype.forEach;
    var containerWidth = containerEle.getBoundingClientRect().width;
    var firstChildWidth = itemsNodeList[0].getBoundingClientRect().width + gutter;
    var cols = Math.max(Math.floor((containerWidth - gutter) / firstChildWidth), 1);
    var count = 0;

    containerWidth = (firstChildWidth * cols + gutter) + 'px';
    containerEle.style.width = containerWidth;
    containerEle.style.position = 'relative';

    var itemsGutter = [];
    var itemsPosX = [];

    for ( var g = 0 ; g < cols ; ++g ) {
      itemsPosX.push(g * firstChildWidth + gutter);
      itemsGutter.push(gutter);
    }

    // RTL support
    if (this.props.rtl) {
      itemsPosX.reverse();
    }

    forEach.call(itemsNodeList, function (item) {
      var itemIndex = itemsGutter
        .slice(0)
        .sort(function (a, b) {
          return a - b;
        })
        .shift();
      itemIndex = itemsGutter.indexOf(itemIndex);

      var posX = parseInt(itemsPosX[itemIndex]);
      var posY = parseInt(itemsGutter[itemIndex]);

      item.style.position = 'absolute';
      item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
      item.style.transformStyle = 'preserve-3d';
      item.style.transform = 'translate3D(' + posX + 'px,' + posY + 'px, 0)';

      itemsGutter[itemIndex] += item.getBoundingClientRect().height + gutter;
      count = count + 1;

    });

		containerEle.style.display = '';

    var containerHeight = itemsGutter
      .slice(0)
      .sort(function (a, b) {
        return a - b;
      })
      .pop();

    containerEle.style.height = containerHeight + 'px';

    if (typeof done === 'function') {
      done(itemsNodeList);
    }
  }

  return Minigrid;

}));


/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(204);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObject(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
            if (!options.allowPrototypes) {
                continue;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(204);
var formats = __webpack_require__(203);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};
    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter
        ));
    }

    return keys.join(delimiter);
};


/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = __webpack_require__(97);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;

var _assertString = __webpack_require__(97);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(239);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//get sass file and compiled to css

__webpack_require__(255);

__webpack_require__(99);

var _webfontloader = __webpack_require__(257);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _reactMultipleRender = __webpack_require__(256);

var _reactMultipleRender2 = _interopRequireDefault(_reactMultipleRender);

var _contactForm = __webpack_require__(242);

var _contactForm2 = _interopRequireDefault(_contactForm);

var _headerSlider = __webpack_require__(246);

var _headerSlider2 = _interopRequireDefault(_headerSlider);

var _sectionVideo = __webpack_require__(155);

var _sectionVideo2 = _interopRequireDefault(_sectionVideo);

var _projects = __webpack_require__(154);

var _projects2 = _interopRequireDefault(_projects);

var _accordion = __webpack_require__(240);

var _accordion2 = _interopRequireDefault(_accordion);

var _posts = __webpack_require__(247);

var _posts2 = _interopRequireDefault(_posts);

var _donate = __webpack_require__(243);

var _donate2 = _interopRequireDefault(_donate);

var _campaignsSlider = __webpack_require__(241);

var _campaignsSlider2 = _interopRequireDefault(_campaignsSlider);

var _downloadPdf = __webpack_require__(244);

var _downloadPdf2 = _interopRequireDefault(_downloadPdf);

var _galleryHeader = __webpack_require__(245);

var _galleryHeader2 = _interopRequireDefault(_galleryHeader);

var _projectsAbout = __webpack_require__(248);

var _projectsAbout2 = _interopRequireDefault(_projectsAbout);

var _set_menu = __webpack_require__(251);

var _set_menu2 = _interopRequireDefault(_set_menu);

var _set_menu_mobile = __webpack_require__(252);

var _set_menu_mobile2 = _interopRequireDefault(_set_menu_mobile);

var _donate_redirect = __webpack_require__(249);

var _donate_redirect2 = _interopRequireDefault(_donate_redirect);

var _smoothScroll = __webpack_require__(253);

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _scrollViaCrucisNav = __webpack_require__(250);

var _scrollViaCrucisNav2 = _interopRequireDefault(_scrollViaCrucisNav);

var _toggleViaCrucisNav = __webpack_require__(254);

var _toggleViaCrucisNav2 = _interopRequireDefault(_toggleViaCrucisNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//jquery stuff :(
_webfontloader2.default.load({
  google: { families: ['Source Sans Pro:400,600,700'] },
  custom: { families: ['Ionicons'], testStrings: { Ionicons: '\uF10C\uF109' } },
  fontinactive: function fontinactive(familyName, fvd) {
    console.error(familyName + ' failed to load');
  }
});

//react renders

//React components :)
(0, _reactMultipleRender2.default)(_headerSlider2.default, '.header-slider');
(0, _reactMultipleRender2.default)(_contactForm2.default, '.contact-form');
(0, _reactMultipleRender2.default)(_posts2.default, '.bs-posts');
(0, _reactMultipleRender2.default)(_donate2.default, '.bs-donate-react');
(0, _reactMultipleRender2.default)(_projects2.default, '.projects-container');
(0, _reactMultipleRender2.default)(_accordion2.default, '.bs-accordion');
(0, _reactMultipleRender2.default)(_sectionVideo2.default, '.section-video');
(0, _reactMultipleRender2.default)(_campaignsSlider2.default, '.bs-campaings-slider');
(0, _reactMultipleRender2.default)(_downloadPdf2.default, '.bs-download-pdf');
(0, _reactMultipleRender2.default)(_galleryHeader2.default, '.bs-gallery-header');
(0, _reactMultipleRender2.default)(_projectsAbout2.default, '.bs-projects-about');

//jquery calls
(0, _set_menu2.default)();
(0, _set_menu_mobile2.default)();
(0, _donate_redirect2.default)();
(0, _smoothScroll2.default)();
(0, _toggleViaCrucisNav2.default)();
(0, _scrollViaCrucisNav2.default)();

function stickMenu(e) {
  var $nav = $('.nav');
  var $stickyMenu = $('.sticky-menu');
  var $parentSticky = $stickyMenu ? $stickyMenu.parent().offset().top : 0;
  var stickyMenuTop = $stickyMenu ? $stickyMenu.offset().top : 0;
  var navTop = $nav ? $nav.offset().top : 0;
  var containerHeight = $('.sticky-menu__container').height();
  var maxTop = containerHeight - $('.sticky-menu').innerHeight();
  var top = navTop;
  var br = document.querySelector('.sticky-menu__container').getBoundingClientRect();
  var h = $('.sticky-menu').innerHeight() + 40;

  if (br.top - 110 < 0 && br.bottom - h > 0) {
    $stickyMenu.css({ position: 'relative', top: top });
  }
}

if ($('.sticky-menu').length > 0) {
  window.addEventListener('scroll', stickMenu);
}

function toggleMenu() {
  if (window.innerWidth < 701) {
    $('.grant-menu__list') ? $('.grant-menu__list').removeClass('dropdown-list--show') : '';
  }

  $('.grant-menu__title').on('click', function (e) {
    e.preventDefault();
    var $list = $('.grant-menu__list');

    if ($list.hasClass('dropdown-list--show')) {
      $list.removeClass('dropdown-list--show');
    } else {
      $list.addClass('dropdown-list--show');
    }
  });

  $('.dropdown-trigger').on('click', function (e) {
    e.preventDefault();
    var $list = $(this).parent().find('.dropdown-list');
    if ($list.hasClass('dropdown-list--show')) {
      $list.removeClass('dropdown-list--show');
    } else {
      $list.addClass('dropdown-list--show');
    }
  });
}

toggleMenu();

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(526);
var parse = __webpack_require__(525);
var formats = __webpack_require__(203);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ })

},[630]);
//# sourceMappingURL=app.1c4d45738e3f3495feb9.js.map