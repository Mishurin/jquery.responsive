(function($) {
    var DEFAULT_SETTINGS = {
        breakpoints: [
            {'mobile': 768},
            {'tablet': 992},
            {'desktop': 1200}
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
            proto['is' + _capitalizeFirstLetter(Object.keys(breakpoints[i])[0])] = function() {};
        }
    }

    function _preparePrototypeFromObject(proto, breakpoints) {
        for(var breakpoint in breakpoints) {
            proto['is' + _capitalizeFirstLetter(breakpoint)] = function() {};
        }
    }

    var Responsive = function () {};

	$.responsive = function(settings) {
        var proto = Responsive.prototype = {};
        var settings = $.extend({}, DEFAULT_SETTINGS, settings);
        var breakpoints = settings.breakpoints;
        if($.isArray(breakpoints)) {
            _preparePrototypeFromArray(proto, breakpoints);
        } else if(_isObject(breakpoints)) {
            _preparePrototypeFromObject(proto, breakpoints);
        } else {
            breakpoints = DEFAULT_SETTINGS.breakpoints;
            _preparePrototypeFromArray(proto, breakpoints);
        }

        return new Responsive(settings);
	};
}(jQuery));