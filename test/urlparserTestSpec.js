describe("Tests of urlparser", function () {

    describe("Tests of the parse() function", function () {
        it("should throw an error for empty URL strings", function () {
            // given
            var urlString = "",
                errorCaught = false,
                url;

            // when
            try {
                url = urlParser.parse(urlString);
            } catch (error) {
                errorCaught = true;
            }

            //then
            expect(errorCaught).to.be(true);
        });
    });
});
