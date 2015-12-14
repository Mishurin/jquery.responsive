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
        proxy: null,
        interval: 100,
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
            var capitalizedMethod = _capitalizeFirstLetter((breakpoints[i].name));
            proto['is' + capitalizedMethod] = (function(breakpoint) {
                return function() {
                    return breakpoint.name === this.state;
                };
            })(breakpoints[i]);
            proto['if' + capitalizedMethod] = (function(breakpoint) {
                return function(fn, args) {
                    if(breakpoint.name === this.state) {
                        fn.call(args);
                    }
                };
            })(breakpoints[i]);
        }
    }

    function _preparePrototypeFromObject(proto, breakpoints) {
        for(var breakpoint in breakpoints) {
            if(breakpoints.hasOwnProperty(breakpoint)) {
                var capitalizedMethod = _capitalizeFirstLetter(breakpoints[breakpoint]);
                proto['is' + capitalizedMethod] = (function(val) {
                    return function() {
                        return val === this.state;
                    };
                })(breakpoints[breakpoint]);

                proto['if' + capitalizedMethod] = (function(val) {
                    return function(fn, args) {
                        if(val === this.state) {
                            fn.call(null, args);
                        }
                    };
                })(breakpoints[breakpoint]);
            }
        }
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
        this.state = this.getBreakpoint();
        if(!!this.settings.resize) {
            if(this.settings.proxy) {
                $window.on('resize', this.settings.proxy(_windowResizeHandler, this.settings.interval).bind(this));
            } else {
                $window.on('resize', _windowResizeHandler.bind(this));
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

        proto.if = function (checkArr, fn, args) {
            if(checkArr.indexOf(this.state) !== -1) {
                fn.call(null, args);
            }
        };

        proto.not = function (checkArr, fn, args) {
            if(checkArr.indexOf(this.state) !== -1) {
                return;
            } else {
                fn.call(null, args);
            }
        };

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
        return currentBreakPoint;
    };

    var _getBreakPointFromMediaQueries = function () {
        var indicator = this.settings.indicator;
        return getComputedStyle(indicator, ':after').content.replace(/"|'/gi, '');
    };

    var _windowResizeHandler = function () {
        var _this = this;
        var currentState = this.getBreakpoint();
        if(this.state !== currentState) {
            this.emit('resize.' + currentState);
            this.emit('change', {prev: _this.state, cur: currentState});
            this.state = currentState;
        }
        this.emit('resize');
    };

}(jQuery));