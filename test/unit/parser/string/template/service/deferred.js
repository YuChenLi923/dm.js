var Test     = require("./../test"),
    Template = require('../../../../../../lib/parser/string/template/service/deferred'),
    test;

test = Test(function() { return new Template() }, { title: "ServiceDeferredTemplate" });

test.yes("&@service",                  [{ name: "service", property: undefined, args: undefined }]);
test.yes("&@service:method",           [{ name: "service", property: "method",  args: undefined }]);
test.yes("&@service:method[1,2,null]", [{ name: "service", property: "method",  args: [1,2,null] }]);

test.no("&ser@vice");

test.run();