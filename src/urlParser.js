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
                var authority,
                    address,
                    username,
                    password,
                    credentials,
                    hostname,

                    port,
                    credentialEndIndex,
                    usernameEndIndex,
                    authorityEndIndex,
                    hostnameEndIndex,
                    toExtractFrom = parsedSegments.rest;

                authorityEndIndex = _firstIndexOf(toExtractFrom, ['/', '?', '#']);
                if (authorityEndIndex === -1) {
                    authority = toExtractFrom;
                    parsedSegments.rest = '';
                } else {
                    authority = toExtractFrom.substring(0, authorityEndIndex);
                    parsedSegments.rest = toExtractFrom.substring(authorityEndIndex);
                }

                credentialEndIndex = authority.indexOf('@');
                if (credentialEndIndex === -1) { // no credentials
                    username = '';
                    password = '';
                    address = authority;
                } else {
                    credentials = authority.substring(0, credentialEndIndex);
                    address = authority.substring(credentialEndIndex + 1);

                    usernameEndIndex = credentials.indexOf(':');
                    if (usernameEndIndex === -1) { // no password
                        username = credentials;
                        password = '';
                    } else { // password
                        username = credentials.substring(0, usernameEndIndex);
                        password = credentials.substring(usernameEndIndex + 1);
                    }
                }

                // extract hostname and port from the address
                hostnameEndIndex = address.indexOf(':');
                if (hostnameEndIndex === -1) { // no port
                    hostname = address;
                    port = '';
                } else { // port
                    hostname = address.substring(0, hostnameEndIndex);
                    port = address.substring(hostnameEndIndex + 1);
                }

                parsedSegments.username = username;
                parsedSegments.password = password;
                parsedSegments.address = hostname;
                parsedSegments.port = port;

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
                    queryStartIndex,
                    queryEndIndex;

                queryStartIndex = toExtractFrom.indexOf('?');
                if (queryStartIndex === -1) {
                    queryString = '';
                } else {
                    queryEndIndex = toExtractFrom.indexOf('#');
                    if (queryEndIndex === -1) {
                        queryString = toExtractFrom.substring(1); // strip leading '?'
                        parsedSegments.rest = '';
                    } else {
                        // strip leading '?' and trailing fragment
                        queryString = toExtractFrom.substring(1, queryEndIndex);
                        parsedSegments.rest = toExtractFrom.substring(queryEndIndex);
                    }
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
