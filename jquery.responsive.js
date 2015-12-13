(function($) {
    var STANDARD_MEDIA = [768, 992, 1200];
    var Responsive = function (settings) {
        var settings = $.extend({}, settings);
        settings.media = settings.media? settings.media : STANDARD_MEDIA;
        settings.resize = typeof settings.resize === 'boolean'? settings.resize : true;
        return settings;
    };
	$.responsive = function(settings) {
        if(settings) return new Responsive(settings);
	};
}(jQuery));