var _        = require('lodash'),
    sinon    = require('sinon'),
    chai     = require('chai'),
    Async    = require('../../../../../src/dm/async'),
    Provider = require('../../../../../src/dm/provider'),
    Chance   = require("chance"),
    RSVP     = require("rsvp"),
    ParameterTemplateParser = require('../../../../../src/dm/parser/string/multiple/parameter'),
    assert, expect;

assert = chai.assert;
expect = chai.expect;
chance = new Chance;

describe("ParameterTemplateParser", function() {
    var parser, async, provider, providerMock;

    beforeEach(function () {
        // create instance of Async
        async = Object.create(Async.prototype);
        sinon.stub(async, "promise", function(cb) {
            return new RSVP.Promise(cb);
        });

        // create instance of Provider
        provider = Object.create(Provider.prototype);

        parser = new ParameterTemplateParser(async, provider);
    });

    it("should call provider's #make method with correct signature", function() {
        var param, string, providerStub;

        param  = chance.word();
        string = "%{" + param + "}";

        providerStub = sinon.stub(provider, "get", function() {
            return RSVP.Promise.resolve();
        });

        parser.parse(string);

        expect(providerStub.firstCall.args[0]).to.deep.equal({
            name: param
        });
    });

});