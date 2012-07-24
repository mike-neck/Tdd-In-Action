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
    });

    module("Array extension test");
    test ("Array#compare method", function () {
        var array1 = [1,2,3], competition1 = [1,2,3],
            array2 = [1, true, "string"], competition2 = [1, true, "string"],
            date = new Date(),
            array3 = [2, date, [1]], competition3 = [2, date, [1]],
            array4 = [3, date, [1, [3, 4]]], competition4 = [3, date, [1, [3, 4]]],
            dist1 = [1], distinction1 = 1,
            dist2 = [1,2,3], distinction2 = [1,2,4],
            dist3 = [1,"string"], distinction3 = [1, true];

        ok (array1.compare(competition1), "[1,2,3] equals [1,2,3]");
        ok (array2.compare(competition2), "[1, true, 'string'] equals [1, true, 'string']");
        ok (array3.compare(competition3), "complex type comparing.");
        ok (array4.compare(competition4), "more complex type comparing.");
        equal (dist1.compare(distinction1), false, "different type comparison.");
        equal (dist2.compare(distinction2), false, "different value comparison.");
        equal (dist3.compare(distinction3), false, "different value comparison.");
    });
});