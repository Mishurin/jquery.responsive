describe("JQuery Responsive Helpers Test Suit", function() {
    it("JQuery should be included before plugin", function() {
        expect(jQuery).toBeFunction();
    });

    it("JQuery responsive helper should be a function", function() {
        expect($.responsive).toBeFunction();
    });

    it("JQuery responsive helper should return an object", function() {
        expect($.responsive()).toBeObject();
    });
});