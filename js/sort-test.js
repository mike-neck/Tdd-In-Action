$(document).ready(function(){

    module ("no ajax");
    test("normal contains", function () {
        var array = org.mikeneck.sort.constArraySorted,
            containsTestCase = {
                target : 2,
                expected : true
            },
            notContainsTestCase = {
                target : 6,
                expected : false
            },
            contains = sort.test.normalContains,
            message = function (array, target, expect) {
                return 'array [' + array + '] should ' +
                    (expect? '' : 'not ') +
                    'contain ' + target + '.';
            },
            testCase;

        testCase = containsTestCase;
        equal (contains(testCase.target, array),
            testCase.expected,
            message(array, testCase.target, testCase.expected));

        testCase = notContainsTestCase;
        equal (contains(testCase.target, array),
            testCase.expected,
            message(array, testCase.target, testCase.expected));
    });

    test("fast contains", function () {
        var array = org.mikeneck.sort.constArraySorted,
            containsTestCase = {
                target : 2,
                expected : true
            },
            notContainsTestCase = {
                target : 6,
                expected : false
            },
            contains = sort.test.fastContains,
            message = function (array, target, expect) {
                return 'array [' + array + '] should ' +
                    (expect? '' : 'not ') +
                    'contain ' + target + '.';
            },
            testCase;

        testCase = containsTestCase;
        equal (contains(testCase.target, array),
            testCase.expected,
            message(array, testCase.target, testCase.expected));

        testCase = notContainsTestCase;
        equal (contains(testCase.target, array),
            testCase.expected,
            message(array, testCase.target, testCase.expected));
    })
});