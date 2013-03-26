(function (global) {
   "use strict";

    /**
     *
     * @type {object}
     */
    global.urlParser = (function() {
        var _parse = function (urlString) {
            throw new Error("Invalid URL: " + urlString);
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