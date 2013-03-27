
describe("Test all combinations of valid URL segments for an absolute URL", function () {

    var segmentsTemplate = {
        scheme: ['http'],
        username: ['', 'user'],
        password: ['', 'passwd'],
        hostname: ['example.com'],
        port: ['', '80'],
        path: ['', '/'],
        queryString: ['', 'p=v'],
        fragment: ['', 'f2']
    };

    testutils.addParseValidUrlTestFunctionsToSpec(segmentsTemplate);

});


