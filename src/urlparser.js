(function (global) {
   "use strict";

    /**
     *
     * @type {object}
     */
    global.urlParser = (function() {

        var _extractScheme = function (parsedSegments) {
                var split = parsedSegments.rest.split(':'),
                    // shift() removes the first item and returns it
                    scheme = split.shift();
                parsedSegments.scheme = scheme;
                parsedSegments.rest = split.join(':');
                return parsedSegments;
            },

            _extractDoubleSlash = function (segments) {
                return segments;
            },

            _extractCredentialsFromAuthority = function (segments) {
                return segments;
            },

            _extractAddressFromAuthority = function (segments) {
                return segments;
            },

            _extractAuthority = function (segments) {
                segments = _extractCredentialsFromAuthority(segments);
                segments = _extractAddressFromAuthority(segments);
                return segments;
            },

            _extractPath = function (segments) {
                return segments;
            },

            _extractQueryString = function (segments) {
                return segments;
            },

            _extractFragment = function (segments) {
                return segments;
            },

            _parse = function (urlString) {
                var parsedSegments = { rest : urlString };
                if (!urlString) {  // Empty string, null, or undefined
                    throw new Error("Invalid URL: " + urlString);
                }
                parsedSegments = _extractScheme(parsedSegments);
                parsedSegments = _extractDoubleSlash(parsedSegments);
                parsedSegments = _extractAuthority(parsedSegments);
                parsedSegments = _extractPath(parsedSegments);
                parsedSegments = _extractQueryString(parsedSegments);
                parsedSegments = _extractFragment(parsedSegments);
                return parsedSegments;
        };

        return {
            /**
             * Function parsing URLs.
             * Has no side effects or state.
             *
             * @param {String} urlString URL to parse
             * @return {Url} a URL object
             */
            parse : function(urlString) {
                var segments = _parse(urlString);
                return new Url(segments);
            }
        };
    }());

}(window));