describe("Tests of urlparser", function () {

    var schemes = ["http", "https", "ftp", "file", "data"],
        gTLDs = ["aero", "asia", "biz", "cat", "com", "coop", "edu", "gov", "info", "int", "jobs", "mil", "mobi",
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

        describe("Tests of absolute URLs with that all have scheme and none have credentials", function () {

            it("[x__x___] should be able to parse a URL with scheme, double slash, and address", function () {
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

            it("[x__xx__] should be able to parse a URL with scheme, double slash, address, and path", function () {
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

            it("[x__x_x_] should be able to parse a URL with scheme, double slash, address and query string");

            it("[x__x__x] should be able to parse a URL with scheme, double slash, address and fragment");

            it("[x__xxx_] should be able to parse a URL with scheme, double slash, address, path, and query string", function () {
                // given
                var urlString = "https://www.google.com/analytics/web/provision?et=&authuser=",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                expect(url).to.be.an('object');

                expect(url.scheme).to.equal('https');
                expect(url.doubleSlash).to.equal(true);
                expect(url.username).to.equal('');
                expect(url.password).to.equal('');
                expect(url.address).to.equal('www.google.com');
                expect(url.port).to.equal('');
                expect(url.path).to.equal('/analytics/web/provision');
                expect(url.queryString).to.equal('et=&authuser=');
                expect(url.fragment).to.equal('');
            });

            it("[x__xx_x] should be able to parse a URL with scheme, double slash, address, path, and fragment", function () {
                // given
                var urlString = "http://1-liner.org/#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                expect(url).to.be.an('object');

                expect(url.scheme).to.equal('http');
                expect(url.doubleSlash).to.equal(true);
                expect(url.username).to.equal('');
                expect(url.password).to.equal('');
                expect(url.address).to.equal('1-liner.org');
                expect(url.port).to.equal('');
                expect(url.path).to.equal('/');
                expect(url.queryString).to.equal('');
                expect(url.fragment).to.equal('!usage');
            });

            it("[x__x_xx] should be able to parse a URL with scheme, double slash, address, query string and fragment");

            it("[x__xxxx] should be able to parse a URL with scheme, double slash, address, path, query string, and fragment", function () {
                // given
                var urlString = "http://1-liner.org/?x=1#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                expect(url).to.be.an('object');

                expect(url.scheme).to.equal('http');
                expect(url.doubleSlash).to.equal(true);
                expect(url.username).to.equal('');
                expect(url.password).to.equal('');
                expect(url.address).to.equal('1-liner.org');
                expect(url.port).to.equal('');
                expect(url.path).to.equal('/');
                expect(url.queryString).to.equal('x=1');
                expect(url.fragment).to.equal('!usage');
            });

        });

    });
});
