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

    it("Settings object is required", function() {
        expect($.responsive()).toBeUndefined();
    });

    it("Should return standard set when no media specified in object", function() {
        expect($.responsive({}).media).toEqual([768, 992, 1200]);
    });

    it("Should return standard set when no media specified in object", function() {
        var settings = {
            media: [600, 700, 800]
        };
        expect($.responsive(settings).media).toEqual([600, 700, 800]);
    });
    it("Should return true resize option if it was not specified in settings", function() {
        expect($.responsive({}).resize).toBeTruthy();
    });

    it("Should return specified resize option", function() {
        expect($.responsive({resize: false}).resize).toBeFalsy();
    });
});