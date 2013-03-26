(function () {
    "use strict";

    describe("Url constructor tests", function () {

        it("should create a Url object from the specified segment object containing all values", function () {
            // given
            var segments = {
                    scheme: 'http',
                    doubleSlash: true,
                    username: 'a_name',
                    password: 'pw',
                    address: 'example.com',
                    port: 8080,
                    path: '/test.html',
                    queryString: 'param=value',
                    fragment: 'my_fragment'
                },
                url;

            // when
            url = new Url(segments);

            // then
            expect(url).to.be.an('object');
            expect(url.scheme).to.be.equal(segments.scheme);
            expect(url.doubleSlash).to.be.equal(segments.doubleSlash);
            expect(url.username).to.be.equal(segments.username);
            expect(url.password).to.be.equal(segments.password);
            expect(url.address).to.be.equal(segments.address);
            expect(url.port).to.be.equal(segments.port);
            expect(url.path).to.be.equal(segments.path);
            expect(url.queryString).to.be.equal(segments.queryString);
            expect(url.fragment).to.be.equal(segments.fragment);
        });


        it("should create a Url with default values if the segment object does not contain any values", function () {
            // given
            var emptySegments = {},
                url;

            // when
            url = new Url(emptySegments);

            // then
            expect(url).to.be.an('object');

            expect(url.scheme).to.be.equal('');
            expect(url.doubleSlash).to.be.equal(true);
            expect(url.username).to.be.equal('');
            expect(url.password).to.be.equal('');
            expect(url.address).to.be.equal('');
            expect(url.port).to.be.equal('');
            expect(url.path).to.be.equal('');
            expect(url.queryString).to.be.equal('');
            expect(url.fragment).to.be.equal('');
        });

        it("should create a Url with default values if the segment object is undefined", function () {
            // given
            var url;

            // when
            url = new Url();

            // then
            expect(url).to.be.an('object');

            expect(url.scheme).to.be.equal('');
            expect(url.doubleSlash).to.be.equal(true);
            expect(url.username).to.be.equal('');
            expect(url.password).to.be.equal('');
            expect(url.address).to.be.equal('');
            expect(url.port).to.be.equal('');
            expect(url.path).to.be.equal('');
            expect(url.queryString).to.be.equal('');
            expect(url.fragment).to.be.equal('');
        });

    });

}());