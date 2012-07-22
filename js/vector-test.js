/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/01
 * Time: 16:32
 * To change this template use File | Settings | File Templates.
 */
($(document).ready(function() {
    module('Small Vector');
    test('basic functions - size', function () {
        var vector = org.mikeneck.vector.SmallVector();
        equal (vector.length, 10, 'initial length is 10');
        equal (vector.size(), 0, 'initial size should be 0.');
        vector[0] = 1;
        equal (vector.size(), 1, 'after adding an element, size should be 1.')
    });

    /**
    test('basic functions - add', function () {
        var vector = org.mikeneck.vector.SmallVector();
        equal (vector.length, 10, 'initial length is 10');
        equal (vector.size(), 0 , 'initial size should be 0.');
        vector.add (0);
        equal (vector.length, 10, 'after adding an element, length remains 10.');
        equal (vector.size(), 1, 'after adding an element, size should be 1.');
        var array = [1,2,3,4,5,6,7,8,9,10];
        for (var i in array) {
            vector.add(array[i]);
        }
        equal (vector.size(), 11, 'after adding 11 element, size should be 11.');
        equal (vector.length, 20, 'after extension, length becomes 20.');
    });
    **/
}));
