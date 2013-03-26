describe("Tests of urlparser", function () {

    var schemes = ["http", "https", "ftp", "file", "data"],
        gTLDs   = ["aero", "asia", "biz", "cat", "com", "coop", "edu", "gov", "info", "int", "jobs", "mil", "mobi",
                   "museum", "name", "net", "org", "post", "pro", "tel", "travel", "xxx"];

    describe("Tests of the parse() function", function () {

        it("should throw an error for undefined URL strings", function () {
            // given
            var errorCaught = false,
                url;

            // when
            try {
                url = urlParser.parse(/* undefined */);
            } catch (error) {
                errorCaught = true;
            }

            //then
            expect(errorCaught).to.be(true);
        });

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

        describe("Tests of absolute URLs with the ASCII character set", function () {

            it("should be able to parse a URL with scheme, double slash, and address", function () {
                // given
                var urlString = "https://github.com",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                expect(url).to.be.an('object');

                expect(url.scheme).to.equal('https');
                expect(url.doubleSlash).to.equal(true);
                expect(url.username).to.equal('');
                expect(url.password).to.equal('');
                expect(url.address).to.equal('github.com');
                expect(url.port).to.equal('');
                expect(url.path).to.equal('');
                expect(url.queryString).to.equal('');
                expect(url.fragment).to.equal('');
            });

            it("should be able to parse a URL with scheme, double slash, address, and path", function () {
                // given
                var urlString = "https://github.com/johnwilander/urlparser/blob/master/src/Url.js",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                expect(url).to.be.an('object');

                expect(url.scheme).to.equal('https');
                expect(url.doubleSlash).to.equal(true);
                expect(url.username).to.equal('');
                expect(url.password).to.equal('');
                expect(url.address).to.equal('github.com');
                expect(url.port).to.equal('');
                expect(url.path).to.equal('/johnwilander/urlparser/blob/master/src/Url.js');
                expect(url.queryString).to.equal('');
                expect(url.fragment).to.equal('');
            });

            it("should be able to parse a URL with scheme, double slash, address, path, and query string");
            it("should be able to parse a URL with scheme, double slash, address, path, query string, and fragment");
            it("should be able to parse a URL with scheme, double slash, address, path, and fragment");
        });

    });
});
