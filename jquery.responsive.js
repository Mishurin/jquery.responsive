(function($) {
    var Responsive = function (settings) {
        var settings = $.extend({}, settings);
    };
	$.responsive = function(settings) {
        if(settings) return new Responsive(settings);
	};
}(jQuery));