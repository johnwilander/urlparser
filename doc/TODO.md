TODO

Things to handle in the short run


* add support for parsing credentials (username and password)
* add support for parsing port
* test quirks (multiple '?' and '#' etc)
* add support for relative URLs
* test URL escape values
* add negative tests to the test suite
    * missing parts ('//', ':' etc)
    * invalid characters
* add convenience functions to the Url object, e.g.
    * getQueryParameters()
    * matchesOwnDomain()
    * isAbsolute()
* add support for generating test URLs from test data
    * array of schemes
    * array of TLDs
    * etc

Things to handle in the long run
* add different modes (strict, loose, secure?)
* whitelist the folowing?
    * gTLDs (generic)
    * country TLDs
    * schemes
    * pseudo schemes?
    * port numbers
* jQuery plugin
* AMD support
* CommonJS support
