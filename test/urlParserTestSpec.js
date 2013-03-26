describe("Tests of urlparser", function () {

    var assertUrl = function (url, expected) {
        expect(url).to.be.an('object');

        expect(url.scheme).to.equal(expected.scheme || '');
        expect(url.doubleSlash).to.equal(true);
        expect(url.username).to.equal(expected.username || '');
        expect(url.password).to.equal(expected.password || '');
        expect(url.address).to.equal(expected.address || '');
        expect(url.port).to.equal(expected.port || '');
        expect(url.path).to.equal(expected.path || '');
        expect(url.queryString).to.equal(expected.queryString || '');
        expect(url.fragment).to.equal(expected.fragment || '');
    };


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

        describe("Tests of absolute URLs with that all have scheme, double slash and none have credentials", function () {

            it("[x__x___] should be able to parse a URL with scheme, and address", function () {
                // given
                var urlString = "https://github.com",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    address: 'github.com'
                });
            });

            it("[x__xx__] should be able to parse a URL with scheme, address, and path", function () {
                // given
                var urlString = "https://github.com/johnwilander/urlparser/blob/master/src/Url.js",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    address: 'github.com',
                    path: '/johnwilander/urlparser/blob/master/src/Url.js'
                });
            });

            it("[x__x_x_] should be able to parse a URL with scheme, address, and query string", function () {
                // given
                var urlString = "http://example.com?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    queryString: 'param=value'
                });
            });

            it("[x__x__x] should be able to parse a URL with scheme, address, and fragment", function () {
                // given
                var urlString = "http://1-liner.org#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: '1-liner.org',
                    fragment: '!usage'
                });
            });

            it("[x__xxx_] should be able to parse a URL with scheme, address, path, and query string", function () {
                // given
                var urlString = "https://www.google.com/analytics/web/provision?et=&authuser=",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    address: 'www.google.com',
                    path: '/analytics/web/provision',
                    queryString: 'et=&authuser='
                });
            });

            it("[x__xx_x] should be able to parse a URL with scheme, address, path, and fragment", function () {
                // given
                var urlString = "http://1-liner.org/#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: '1-liner.org',
                    path: '/',
                    fragment: '!usage'
                });
            });

            it("[x__x_xx] should be able to parse a URL with scheme, address, query string, and fragment", function () {
                // given
                var urlString = "http://example.com?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[x__xxxx] should be able to parse a URL with scheme, address, path, query string, and fragment", function () {
                // given
                var urlString = "http://1-liner.org/?x=1#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: '1-liner.org',
                    path: '/',
                    queryString: 'x=1',
                    fragment: '!usage'
                });
            });

        });

    });
});
