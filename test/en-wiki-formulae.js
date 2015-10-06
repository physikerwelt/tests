"use strict";
var assert = require('assert'),
    texvcInfo = require('texvcinfo');

var CHUNKSIZE = 1000;

describe('First chunk of formulae from en-wiki:', function () {
    this.timeout(0);

    // read test cases
    var formulae = require('../data/en-wiki-formulae.json');

    // group them into chunks
    var mkgroups = function (arr, n) {
        var result = [], group = [];
        var seen = Object.create(null);
        arr.forEach(function (elem) {
            if (seen[elem.input]) {
                return;
            } else {
                seen[elem.input] = true;
            }
            group.push(elem);
            if (group.length >= n) {
                result.push(group);
                group = [];
            }
        });
        if (group.length > 0) {
            result.push(group);
        }
        return result;
    };
    var grouped = mkgroups(formulae, CHUNKSIZE);

    // create a mocha test case for each chunk
    grouped.slice(0,1).forEach(function (group) {
        it(group[0].input + ' ... ' + group[group.length - 1].input, function () {
            group.forEach(function (testcase) {
                var f = testcase.input;
                var result = texvcInfo.texvcinfo(f);
                assert.ok(result.length>0);
            });
        });
    });
});
