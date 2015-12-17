describe("JQuery Responsive Helpers Test Suit", function() {

    it("JQuery should be included before plugin", function() {
        expect(jQuery).toBeFunction();
    });

    it("Helper should be a function", function() {
        expect($.responsive).toBeFunction();
    });

    it("Helper should return an object", function() {
        expect($.responsive({})).toBeObject();
    });

    it("Should return default isMobile method", function() {
        expect($.responsive({}).isMobile).toBeFunction();
    });

    it("Should return default isTablet method", function() {
        expect($.responsive({}).isTablet).toBeFunction();
    });

    it("Should return default isDesktop method", function() {
        expect($.responsive().isDesktop).toBeFunction();
    });

    it("Should return default isDesktop method", function() {
        expect($.responsive().isLargeDesktop).toBeFunction();
    });

    it("Should return custom method isA when breakpoints are set", function() {
        expect($.responsive({breakpoints: [{name: 'a', key: '100'}]}).isA).toBeFunction();
    });

    it("Should return custom method isA when breakpoints set as a dictionary", function() {
        expect($.responsive({breakpoints: {a: 'a'}}).isA).toBeFunction();
    });

    it("Should return getBreakpoint method", function() {
        expect($.responsive({breakpoints: {a: 'a'}}).getBreakpoint).toBeFunction();
    });

    it("Should return service function _getState", function() {
        expect($.responsive()._getState).toBeFunction();
    });


    it("Should return helper function 'if", function() {
        expect($.responsive().if).toBeFunction();
    });

    it("Helper function passed to 'if' should be called when breakpoint matched", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(100);
        $.responsive().if(['mobile'], obj.fn, args);
        expect(obj.fn).toHaveBeenCalledWith(args);
    });

    it("Helper function passed to 'if' should not be called when breakpoint does not match", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(1000);
        $.responsive().if(['mobile'], obj.fn, args);
        expect(obj.fn).not.toHaveBeenCalled();
    });

    it("Helper function passed to 'not' should be called when current break point is out of list", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(1000);
        $.responsive().not(['mobile'], obj.fn, args);
        expect(obj.fn).toHaveBeenCalledWith(args);
    });

    it("Helper function passed to 'not' should not be called when current break point is in the list", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(100);
        $.responsive().not(['mobile'], obj.fn, args);
        expect(obj.fn).not.toHaveBeenCalled();
    });

    it("Should return helper function 'not", function() {
        expect($.responsive().not).toBeFunction();
    });

    it("Should return mobile breakpoint", function() {
        spyOn($.fn, 'width').and.returnValue(100);
        expect($.responsive({}).getBreakpoint()).toBe('mobile');
    });

    it("Should return tablet breakpoint", function() {
        spyOn($.fn, 'width').and.returnValue(768);
        expect($.responsive({}).getBreakpoint()).toBe('tablet');
    });

    it("Should return desktop breakpoint", function() {
        spyOn($.fn, 'width').and.returnValue(992);
        expect($.responsive({}).getBreakpoint()).toBe('desktop');
    });

    it("Should return desktop breakpoint", function() {
        spyOn($.fn, 'width').and.returnValue(1200);
        expect($.responsive({}).getBreakpoint()).toBe('largeDesktop');
    });

    it("Should return true for mobile area", function() {
        spyOn($.fn, 'width').and.returnValue(100);
        expect($.responsive({}).isMobile()).toBe(true);
    });

    it("Helper function passed to 'ifMobile' should be called when current breakpoint is mobile", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(100);
        $.responsive().ifMobile(obj.fn, args);
        expect(obj.fn).not.toHaveBeenCalledWith(args);
    });

    it("Helper function passed to 'ifMobile' should never be called when current breakpoint is not mobile", function() {
        var obj = {fn : function() {}};
        var args = ['argument'];
        spyOn(obj, 'fn');
        spyOn($.fn, 'width').and.returnValue(1000);
        $.responsive().ifMobile(obj.fn, args);
        expect(obj.fn).not.toHaveBeenCalledWith(args);
    });

    it("Should return true for tablet area", function() {
        spyOn($.fn, 'width').and.returnValue(768);
        expect($.responsive({}).isTablet()).toBe(true);
    });

    it("Should return true for desktop area", function() {
        spyOn($.fn, 'width').and.returnValue(992);
        expect($.responsive({}).isDesktop()).toBe(true);
    });

    it("Should return true for largeDesktop area", function() {
        spyOn($.fn, 'width').and.returnValue(1200);
        expect($.responsive({}).isLargeDesktop()).toBe(true);
    });

    it("Should return true for mobile area", function() {
        var instance = $.responsive({
            breakpoints: {
                mobile: 'mobile',
                tablet: 'tablet',
                desktop: 'desktop',
                largeDesktop: 'largeDesktop'
            }
        });
        spyOn(instance, 'getBreakpoint').and.returnValue('mobile');
        expect(instance.isMobile()).toBe(true);
    });

    it("Should return true for tablet area with media queries set", function() {
        var instance = $.responsive({
            breakpoints: {
                mobile: 'mobile',
                tablet: 'tablet',
                desktop: 'desktop',
                largeDesktop: 'largeDesktop'
            }
        });
        spyOn(instance, '_getState').and.returnValue('tablet');
        expect(instance.isTablet()).toBe(true);
    });

    it("Should return true for desktop area", function() {
        var instance = $.responsive({
            breakpoints: {
                mobile: 'mobile',
                tablet: 'tablet',
                desktop: 'desktop',
                largeDesktop: 'largeDesktop'
            }
        });
        spyOn(instance, '_getState').and.returnValue('desktop');
        expect(instance.isDesktop()).toBe(true);
    });

    it("Should return true for largeDesktop area", function() {
        var instance = $.responsive({
            breakpoints: {
                mobile: 'mobile',
                tablet: 'tablet',
                desktop: 'desktop',
                largeDesktop: 'largeDesktop'
            }
        });
        spyOn(instance, '_getState').and.returnValue('largeDesktop');
        expect(instance.isLargeDesktop()).toBe(true);
    });

    it("Should return on method when resize is not set explicitly", function() {
        expect($.responsive().on).toBeFunction(true);
    });

    it("Should return undefined referencing to on method when resize is set to false explicitly", function() {
        expect($.responsive({resize: false}).on).toBeUndefined(true);
    });
});