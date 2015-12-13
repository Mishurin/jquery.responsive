(function($) {

    var $window = $(window);

    var DEFAULT_SETTINGS = {
        breakpoints: [
            {
                name: 'mobile',
                value: 0
            },
            {
                name: 'tablet',
                value: 768
            },
            {
                name: 'desktop',
                value: 992
            },
            {
                name: 'largeDesktop',
                value: 1200
            }
        ],
        resize: true,
        throttle: null,
        debounce: null,
        indicator: null
    };

    function _isObject(val) {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

    function _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function _preparePrototypeFromArray(proto, breakpoints) {
        var i = breakpoints.length;
        while(i--) {
            proto['is' + _capitalizeFirstLetter((breakpoints[i].name))] = (function(breakpoint) {
                return function() {
                    return breakpoint.name === this.getBreakpoint();
                };
            })(breakpoints[i]);
        }
    }

    function _preparePrototypeFromObject(proto, breakpoints) {
        for(var breakpoint in breakpoints) {
            if(breakpoints.hasOwnProperty(breakpoint)) {
                proto['is' + _capitalizeFirstLetter(breakpoints[breakpoint])] = (function(val) {
                    return function() {
                        return val === this.getBreakpoint();
                    };
                })(breakpoints[breakpoint]);
            }
        }
    }

    function _throttle(func, ms) {

        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) {
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments);

            isThrottled = true;

            setTimeout(function() {
                isThrottled = false;
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }

    function _debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = new Date().getTime() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    }

    function jqueryEventProxy(name) {
        return function() {
            (this._JQ || ( this._JQ = $(this)))[name].apply(this._JQ, arguments);
        };
    }

    var eventEmitter = {
        emit: jqueryEventProxy('trigger'),
        once: jqueryEventProxy('one'),
        on: jqueryEventProxy('on'),
        off: jqueryEventProxy('off')
    };

    var Responsive = function (settings) {
        this.settings = settings;
        if(!!this.settings.resize) {
            if(this.settings.debounce) {
                window.resize = _debounce(_windowResizeHandler, this.settings.debounce);
            } else if(settings.throttle) {
                window.resize = _throttle(_windowResizeHandler, this.settings.throttle);
            } else {
                window.resize = _windowResizeHandler;
            }
        }
    };

    $.responsive = function(settings) {
        var proto = Responsive.prototype = {};
        var settings = $.extend({}, DEFAULT_SETTINGS, settings);
        var breakpoints = settings.breakpoints;
        if($.isArray(breakpoints)) {
            breakpoints = _sortBreakPoints(breakpoints);
            proto.getBreakpoint = _getBreakPointFromWindowSize;
            _preparePrototypeFromArray(proto, breakpoints);
        } else if(_isObject(breakpoints)) {
            proto.getBreakpoint = _getBreakPointFromMediaQueries;
            _preparePrototypeFromObject(proto, breakpoints);
        } else {
            breakpoints = DEFAULT_SETTINGS.breakpoints;
            proto.getBreakpoint = _getBreakPointFromWindowSize;
            _preparePrototypeFromArray(proto, breakpoints);
        }

        if(!!settings.resize) {
            $.extend(proto, eventEmitter);
        }

        return new Responsive(settings);
    };

    var _sortBreakPoints = function (breakpoints) {
        return breakpoints.sort(function (a, b) {
            return a.value - b.value;
        })
    };

    var _getBreakPointFromWindowSize = function () {
        var breakpoints = this.settings.breakpoints;
        var windowWidth = $window.width();
        var currentBreakPoint = null;
        var i = breakpoints.length;
        while(i--) {
            currentBreakPoint = breakpoints[i].name;
            if(windowWidth >= breakpoints[i].value) {
                return currentBreakPoint
            }
        }
    };

    var _getBreakPointFromMediaQueries = function () {
        var indicator = this.settings.indicator;
        return getComputedStyle(indicator, ':after').content.replace(/"|'/gi, '');
    };

    var _windowResizeHandler = function () {

    };

}(jQuery));