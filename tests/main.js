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
});