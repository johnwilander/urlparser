(function (global, undefined) {
    "use strict";

    /**
     * The URL object represents a URL.
     *
     * @constructor
     * @param {Object} segments the URL segments
     * @param {String} segments.scheme
     * @param {Boolean} segments.doubleSlash
     * @param {String} segments.username
     * @param {String} segments.password
     * @param {String} segments.address
     * @param {String} segments.port
     * @param {String} segments.path
     * @param {String} segments.queryString
     * @param {String} segments.fragment
     */
    global.Url = function (segments) {
        segments = segments || {};
        this.scheme = segments.scheme || '';
        this.doubleSlash = segments.doubleSlash === undefined ? true: segments.doubleSlash;
        this.username = segments.username || '';
        this.password = segments.password || '';
        this.address = segments.address || '';
        this.path = segments.path || '';
        this.port = segments.port || '';
        this.queryString = segments.queryString || '';
        this.fragment = segments.fragment || '';
    };

}(window));
