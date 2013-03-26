(function (global) {
   "use strict";

    /**
     *
     * @type {object}
     */
    global.urlParser = (function() {

        var _extractScheme = function (parsedSegments) {
                var toExtractFrom = parsedSegments.rest,
                    firstHit = toExtractFrom.indexOf(':');
                parsedSegments.scheme = toExtractFrom.substring(0, firstHit);
                parsedSegments.rest = toExtractFrom.substring(firstHit + 1);  // Skip the ':'
                return parsedSegments;
            },

            _extractDoubleSlash = function (parsedSegments) {
                var toLookFor = '//',
                    toExtractFrom = parsedSegments.rest,
                    firstHit = toExtractFrom.indexOf(toLookFor);
                parsedSegments.doubleSlash = firstHit !== -1;
                parsedSegments.rest = toExtractFrom.substring(firstHit + toLookFor.length);  // Skip the '//'
                return parsedSegments;
            },

            _extractCredentialsFromAuthority = function (segments) {
                return segments;
            },

            _extractAddressFromAuthority = function (segments) {
                return segments;
            },

            _firstIndexOf = function(toSearchIn, searchValues) {
                var firstIndex = toSearchIn.length,  // Impossible value
                    currentIndexOf;

                for (var i = 0; i < searchValues.length; i++) {
                    currentIndexOf = toSearchIn.indexOf(searchValues[i]);
                    if (currentIndexOf !== -1 && currentIndexOf < firstIndex) {
                        firstIndex = currentIndexOf;
                    }
                }

                if (firstIndex < toSearchIn.length) {
                    return firstIndex;
                } else {
                    return -1;
                }
            },

            _extractAuthority = function (parsedSegments) {
                var authority, indexOf,
                    toExtractFrom = parsedSegments.rest;

                indexOf = _firstIndexOf(toExtractFrom, ['/', '?', '#']);
                if (indexOf === -1) {
                    authority = toExtractFrom;
                    parsedSegments.rest = '';
                } else {
                    authority = toExtractFrom.substring(0, indexOf);
                    parsedSegments.rest = toExtractFrom.substring(indexOf);
                }

                parsedSegments.address = authority;

                return parsedSegments;
            },

            _extractPath = function (parsedSegments) {
                var toExtractFrom = parsedSegments.rest,
                    path,
                    indexOf;

                indexOf = _firstIndexOf(toExtractFrom, ['?', '#']);
                if (indexOf === -1) {
                    path = toExtractFrom;
                    parsedSegments.rest = '';
                } else {
                    path = toExtractFrom.substring(0, indexOf);
                    parsedSegments.rest = toExtractFrom.substring(indexOf);
                }

                parsedSegments.path = path;
                return parsedSegments;
            },

            _extractQueryString = function (parsedSegments) {
                var toExtractFrom = parsedSegments.rest,
                    queryString,
                    indexOf;

                indexOf = toExtractFrom.indexOf('#');
                if (indexOf === -1) {
                    queryString = toExtractFrom;
                    parsedSegments.rest = '';
                } else {
                    queryString = toExtractFrom.substring(0, indexOf);
                    parsedSegments.rest = toExtractFrom.substring(indexOf);
                }

                // strip leading '?' char
                if (queryString.length > 0) {
                    queryString = queryString.substring(1);
                }

                parsedSegments.queryString = queryString;
                return parsedSegments;
            },

            _extractFragment = function (parsedSegments) {
                var toExtractFrom = parsedSegments.rest,
                    fragment,
                    indexOf;

                indexOf = toExtractFrom.indexOf('#');

                if (indexOf === -1) {
                    fragment = '';
                } else {
                    // strip the leading '#' character
                    fragment = toExtractFrom.substring(indexOf + 1);
                }

                parsedSegments.fragment = fragment;
                return parsedSegments;
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
