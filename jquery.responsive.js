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
        resize: true
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
                proto['is' + _capitalizeFirstLetter(breakpoints[breakpoint])] = function() {};
            }
        }
    }

    var Responsive = function (settings) {
        this.settings = settings;
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

    }

}(jQuery));