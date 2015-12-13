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

    it("Helper should return an object", function() {
        expect($.responsive({})).toBeObject();
    });

    it("Should return default isMobile method", function() {
        expect($.responsive({}).isMobile).toBeFunction();
    });

    it("Should return default isTablet method", function() {
        expect($.responsive({}).isTablet).toBeFunction();
    });

    it("Should return default isTablet method", function() {
        expect($.responsive({}).isDesktop).toBeFunction();
    });

    it("Should return default isMobile method on wrong data type", function() {
        expect($.responsive({breakpoints: null}).isMobile).toBeFunction();
    });

    it("Should return custom method isA when breakpoints are set", function() {
        expect($.responsive({breakpoints: [{name: 'a', key: '100'}]}).isA).toBeFunction();
    });

    it("Should return custom method isA when breakpoints set as a dictionary", function() {
        expect($.responsive({breakpoints: {a: 'a'}}).isA).toBeFunction();
    });

    it("Should return custom method isA when breakpoints set as a dictionary", function() {
        expect($.responsive({}).getBreakpoint).toBeFunction();
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
});