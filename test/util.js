(function (global, undefined) {
    "use strict";

    global.testutils = (function () {
        var _withDefaultsIfEmpty = function (list) {
                if (list.length === 0) {
                    list = [''];
                }
                return list
            },

            _generateSegments = function (segmentsTemplate) {
                var segmentList = [],
                    schemes = _withDefaultsIfEmpty(segmentsTemplate.scheme),
                    usernames = _withDefaultsIfEmpty(segmentsTemplate.username),
                    passwords = _withDefaultsIfEmpty(segmentsTemplate.password),
                    hostnames = _withDefaultsIfEmpty(segmentsTemplate.hostname),
                    ports = _withDefaultsIfEmpty(segmentsTemplate.port),
                    paths = _withDefaultsIfEmpty(segmentsTemplate.path),
                    queryStrings = _withDefaultsIfEmpty(segmentsTemplate.queryString),
                    fragments = _withDefaultsIfEmpty(segmentsTemplate.fragment);

                // TODO this does not work in all browsers, maybe include the underscore library?
                schemes.forEach(function (scheme) {
                    usernames.forEach(function (username) {
                        passwords.forEach(function (password) {
                            hostnames.forEach(function (hostname) {
                                ports.forEach(function (port) {
                                    paths.forEach(function (path) {
                                        queryStrings.forEach(function (queryString) {
                                            fragments.forEach(function (fragment) {
                                                var segments = {
                                                    scheme: scheme,
                                                    username: username,
                                                    password: password,
                                                    address: hostname,
                                                    port: port,
                                                    path: path,
                                                    queryString: queryString,
                                                    fragment: fragment
                                                };
                                                segmentList.push(segments);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                return segmentList;
            },

            _createUrlFromSegments = function (segments) {
                var url = [];

                url.push(segments.scheme);
                url.push('://');

                // credentials
                if (segments.username) {
                    url.push(segments.username);
                }
                if (segments.password) {
                    url.push(':');
                    url.push(segments.password);
                }
                if (segments.username || segments.password) {
                    url.push('@');
                }

                // address
                url.push(segments.address);
                if (segments.port) {
                    url.push(':');
                    url.push(segments.port);
                }

                url.push(segments.path);

                if (segments.queryString) {
                    url.push('?');
                    url.push(segments.queryString);
                }

                if (segments.fragment) {
                    url.push('#');
                    url.push(segments.fragment);
                }

                return url.join('');
            },

            _createMarkerString = function (dataList) {
                var i,
                    list = ['['];
                for (i = 0; i < dataList.length; i++) {
                    if (dataList[i]) {
                        list.push('x');
                    } else {
                        list.push('_');
                    }
                }

                list.push(']');
                return list.join('');
            },

            _generateParseValidUrlTestFunction = function (segments) {
                var testDescription,
                    urlStringToTest,
                    testFunction;

                urlStringToTest = _createUrlFromSegments(segments);
                testDescription = _createMarkerString([
                    segments.scheme,
                    segments.username,
                    segments.password,
                    segments.address,
                    segments.port,
                    segments.path,
                    segments.queryString,
                    segments.fragment
                ]);
                testDescription += ' parse URL: ' + urlStringToTest;

                testFunction = function () {
                    it(testDescription, function () {
                        var url = urlParser.parse(urlStringToTest);
                        assertUrl(url, segments);
                    });
                };
                return testFunction;
            },

            addTestFunctionsToSpec = function (segmentsTemplate) {
                var segmentsList = _generateSegments(segmentsTemplate);
                segmentsList.forEach(function (segments) {
                    var testFunction = _generateParseValidUrlTestFunction(segments);
                    testFunction();
                })
            },

            assertUrl = function (url, expected) {
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

        return {
            /**
             * Assert that the specified Url object matches the data specified
             * in the URL segments.
             *
             * @param {Url} url the url object to test
             * @param {Object} segments the segments that the Url should match
             */
            assertUrl: assertUrl,

            /**
             * Generate mocha it() tests that will parse and validate all URLs based
             * on the combination of specified URL segments.
             *
             * This method should be executed inside a mocha describe() method in order to
             * generate and execute the mocha it() methods.
             *
             * @param {Object} segmentsTemplate the segments that should be combined into the URLs to test
             * @param {Array} segmentsTemplate.scheme
             * @param {Array} segmentsTemplate.username
             * @param {Array} segmentsTemplate.password
             * @param {Array} segmentsTemplate.hostname
             * @param {Array} segmentsTemplate.port
             * @param {Array} segmentsTemplate.path
             * @param {Array} segmentsTemplate.queryString
             * @param {Array} segmentsTemplate.fragment
             */
            addParseValidUrlTestFunctionsToSpec: addTestFunctionsToSpec
        }
    }());

}(window));


