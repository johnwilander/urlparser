describe("Tests of urlparser", function () {

    var assertUrl = function (url, expected) {
        expect(url).to.be.an('object');

        expect(url.scheme).to.equal(expected.scheme || '');
        expect(url.doubleSlash).to.equal(true);
        expect(url.username).to.equal(expected.username || '');
        expect(url.password).to.equal(expected.password || '');
        expect(url.address).to.equal(expected.address || '');
        expect(url.port).to.equal(expected.port || '');
        expect(url.path).to.equal(expected.path || '');
        expect(url.queryString).to.equal(expected.queryString || '');
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

        describe("Tests of absolute URLs with that all have scheme, address and none have credentials, [x__x????]", function () {

            it("[x__x____] should be able to parse a URL with scheme, and address", function () {
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

            it("[x__xx___] should be able to parse a URL with scheme, address, and port", function () {
                // given
                var urlString = "http://example.com:8081",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '8081'
                });
            });

            it("[x__x_x__] should be able to parse a URL with scheme, address, and path", function () {
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

            it("[x__x__x_] should be able to parse a URL with scheme, address, and query string", function () {
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

            it("[x__x___x] should be able to parse a URL with scheme, address, and fragment", function () {
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

            it("[x__xxx__] should be able to parse a URL with scheme, address, port, and path", function () {
                // given
                var urlString = "http://example.com:81/test.html",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '81',
                    path: '/test.html'
                });
            });

            it("[x__xx_x_] should be able to parse a URL with scheme, address, port, and query string", function () {
                // given
                var urlString = "http://example.com:81?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '81',
                    queryString: 'param=value'
                });
            });

            it("[x__xx__x] should be able to parse a URL with scheme, address, port, and fragment", function () {
                // given
                var urlString = "http://example.com:80#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '80',
                    fragment: 'the_fragment'
                });
            });


            it("[x__x_xx_] should be able to parse a URL with scheme, address, path, and query string", function () {
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

            it("[x__x_x_x] should be able to parse a URL with scheme, address, path, and fragment", function () {
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

            it("[x__x__xx] should be able to parse a URL with scheme, address, query string, and fragment", function () {
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

            it("[x__xxxx_] should be able to parse a URL with scheme, address, port, path, and query string", function () {
                // given
                var urlString = "http://example.com:80/test?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value'
                });
            });

            it("[x__xxx_x] should be able to parse a URL with scheme, address, port, path, and fragment", function () {
                // given
                var urlString = "http://example.com:80/test#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    fragment: 'the_fragment'
                });
            });

            it("[x__xx_xx] should be able to parse a URL with scheme, address, port, query string and fragment", function () {
                // given
                var urlString = "http://example.com:80?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '80',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[x__x_xxx] should be able to parse a URL with scheme, address, path, query string, and fragment", function () {
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

            it("[x__xxxxx] should be able to parse a URL with scheme, address, port, path, query string, and fragment", function () {
                // given
                var urlString = "http://example.com:80/test?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

        });

        describe("Tests of absolute URLs with that all have scheme, username, and address", function () {

            it("[xx_x____] should be able to parse a URL with scheme, username, and address", function () {
                // given
                var urlString = "https://user@github.com",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    address: 'github.com'
                });
            });

            it("[xx_xx___] should be able to parse a URL with scheme, username, address, and port", function () {
                // given
                var urlString = "http://user@example.com:8081",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '8081'
                });
            });

            it("[xx_x_x__] should be able to parse a URL with scheme, username, address, and path", function () {
                // given
                var urlString = "https://user@github.com/johnwilander/urlparser/blob/master/src/Url.js",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    address: 'github.com',
                    path: '/johnwilander/urlparser/blob/master/src/Url.js'
                });
            });

            it("[xx_x__x_] should be able to parse a URL with scheme, username, address, and query string", function () {
                // given
                var urlString = "http://user@example.com?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    queryString: 'param=value'
                });
            });

            it("[xx_x___x] should be able to parse a URL with scheme, username, address, and fragment", function () {
                // given
                var urlString = "http://user@1-liner.org#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: '1-liner.org',
                    fragment: '!usage'
                });
            });

            it("[xx_xxx__] should be able to parse a URL with scheme, username, address, port, and path", function () {
                // given
                var urlString = "http://user@example.com:81/test.html",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '81',
                    path: '/test.html'
                });
            });

            it("[xx_xx_x_] should be able to parse a URL with scheme, username, address, port, and query string", function () {
                // given
                var urlString = "http://user@example.com:81?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '81',
                    queryString: 'param=value'
                });
            });

            it("[xx_xx__x] should be able to parse a URL with scheme, username, address, port, and fragment", function () {
                // given
                var urlString = "http://user@example.com:80#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '80',
                    fragment: 'the_fragment'
                });
            });


            it("[xx_x_xx_] should be able to parse a URL with scheme, username, address, path, and query string", function () {
                // given
                var urlString = "https://user@www.google.com/analytics/web/provision?et=&authuser=",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    address: 'www.google.com',
                    path: '/analytics/web/provision',
                    queryString: 'et=&authuser='
                });
            });

            it("[xx_x_x_x] should be able to parse a URL with scheme, username, address, path, and fragment", function () {
                // given
                var urlString = "http://user@1-liner.org/#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: '1-liner.org',
                    path: '/',
                    fragment: '!usage'
                });
            });

            it("[xx_x__xx] should be able to parse a URL with scheme, username, address, query string, and fragment", function () {
                // given
                var urlString = "http://user@example.com?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[xx_xxxx_] should be able to parse a URL with scheme, username, address, port, path, and query string", function () {
                // given
                var urlString = "http://user@example.com:80/test?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value'
                });
            });

            it("[xx_xxx_x] should be able to parse a URL with scheme, username, address, port, path, and fragment", function () {
                // given
                var urlString = "http://user@example.com:80/test#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    fragment: 'the_fragment'
                });
            });

            it("[xx_xx_xx] should be able to parse a URL with scheme, username, address, port, query string and fragment", function () {
                // given
                var urlString = "http://user@example.com:80?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '80',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[xx_x_xxx] should be able to parse a URL with scheme, username, address, path, query string, and fragment", function () {
                // given
                var urlString = "http://user@1-liner.org/?x=1#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: '1-liner.org',
                    path: '/',
                    queryString: 'x=1',
                    fragment: '!usage'
                });
            });

            it("[xx_xxxxx] should be able to parse a URL with scheme, username, address, port, path, query string, and fragment", function () {
                // given
                var urlString = "http://user@example.com:80/test?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });



        });

        describe("Tests of absolute URLs with that all have scheme, username, password, and address", function () {

            it("[xxxx____] should be able to parse a URL with scheme, username, password, and address", function () {
                // given
                var urlString = "https://user:passwd@github.com",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    password: 'passwd',
                    address: 'github.com'
                });
            });

            it("[xxxxx___] should be able to parse a URL with scheme, username, password, address, and port", function () {
                // given
                var urlString = "http://user:passwd@example.com:8081",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '8081'
                });
            });

            it("[xxxx_x__] should be able to parse a URL with scheme, username, password, address, and path", function () {
                // given
                var urlString = "https://user:passwd@github.com/johnwilander/urlparser/blob/master/src/Url.js",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    password: 'passwd',
                    address: 'github.com',
                    path: '/johnwilander/urlparser/blob/master/src/Url.js'
                });
            });

            it("[xxxx__x_] should be able to parse a URL with scheme, username, password, address, and query string", function () {
                // given
                var urlString = "http://user:passwd@example.com?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    queryString: 'param=value'
                });
            });

            it("[xxxx___x] should be able to parse a URL with scheme, username, password, address, and fragment", function () {
                // given
                var urlString = "http://user:passwd@1-liner.org#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: '1-liner.org',
                    fragment: '!usage'
                });
            });

            it("[xxxxxx__] should be able to parse a URL with scheme, username, password, address, port, and path", function () {
                // given
                var urlString = "http://user:passwd@example.com:81/test.html",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '81',
                    path: '/test.html'
                });
            });

            it("[xxxxx_x_] should be able to parse a URL with scheme, username, password, address, port, and query string", function () {
                // given
                var urlString = "http://user:passwd@example.com:81?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '81',
                    queryString: 'param=value'
                });
            });

            it("[xxxxx__x] should be able to parse a URL with scheme, username, password, address, port, and fragment", function () {
                // given
                var urlString = "http://user:passwd@example.com:80#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '80',
                    fragment: 'the_fragment'
                });
            });


            it("[xxxx_xx_] should be able to parse a URL with scheme, username, password, address, path, and query string", function () {
                // given
                var urlString = "https://user:passwd@www.google.com/analytics/web/provision?et=&authuser=",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'https',
                    username: 'user',
                    password: 'passwd',
                    address: 'www.google.com',
                    path: '/analytics/web/provision',
                    queryString: 'et=&authuser='
                });
            });

            it("[xxxx_x_x] should be able to parse a URL with scheme, username, password, address, path, and fragment", function () {
                // given
                var urlString = "http://user:passwd@1-liner.org/#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: '1-liner.org',
                    path: '/',
                    fragment: '!usage'
                });
            });

            it("[xxxx__xx] should be able to parse a URL with scheme, username, password, address, query string, and fragment", function () {
                // given
                var urlString = "http://user:passwd@example.com?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[xxxxxxx_] should be able to parse a URL with scheme, username, password, address, port, path, and query string", function () {
                // given
                var urlString = "http://user:passwd@example.com:80/test?param=value",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value'
                });
            });

            it("[xxxxxx_x] should be able to parse a URL with scheme, username, password, address, port, path, and fragment", function () {
                // given
                var urlString = "http://user:passwd@example.com:80/test#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    fragment: 'the_fragment'
                });
            });

            it("[xxxxx_xx] should be able to parse a URL with scheme, username, password, address, port, query string and fragment", function () {
                // given
                var urlString = "http://user:passwd@example.com:80?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '80',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

            it("[xxxx_xxx] should be able to parse a URL with scheme, username, password, address, path, query string, and fragment", function () {
                // given
                var urlString = "http://user:passwd@1-liner.org/?x=1#!usage",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: '1-liner.org',
                    path: '/',
                    queryString: 'x=1',
                    fragment: '!usage'
                });
            });

            it("[xxxxxxxx] should be able to parse a URL with scheme, username, password, address, port, path, query string, and fragment", function () {
                // given
                var urlString = "http://user:passwd@example.com:80/test?param=value#the_fragment",
                    url;

                // when
                url = urlParser.parse(urlString);

                // then
                assertUrl(url, {
                    scheme: 'http',
                    username: 'user',
                    password: 'passwd',
                    address: 'example.com',
                    port: '80',
                    path: '/test',
                    queryString: 'param=value',
                    fragment: 'the_fragment'
                });
            });

        });
    });
});
