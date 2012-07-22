/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/01
 * Time: 16:04
 * To change this template use File | Settings | File Templates.
 */
(function (){
    if (typeof org === 'undefined') {
        org = {};
    }
    if (typeof org.mikeneck === 'undefined') {
        org.mikeneck = {};
    }
    if (typeof org.mikeneck.vector === 'undefined') {
        org.mikeneck.vector = {};
        org.mikeneck.vector.SmallVector = function (size, next) {
            var s = (typeof size === 'number')? size - size % 1 : 10,
                n = (typeof next === 'number')? next - next % 1 : 10,
                a = new Array(s),
                applyMethod = function (array) {
                    array.size = function () {
                        var result = 0;
                        for (var i in array) {
                            if (typeof array[parseInt(i)] !== 'undefined') {
                                result += 1;
                            }
                        }
                        return result;
                    };
                    array.extend = function () {
                        var nextSize = s + n,
                            arr = org.mikeneck.vector.SmallVector(nextSize, n);
                        for (var i = 0; i < s; i += 1) {
                            arr[i] = array[i];
                        }
                        array = arr;
                        return arr;
                    };
                    array.add = function (e) {
                        if (e === null || typeof e === 'undefined') {
                            return array;
                        }
                        if (array.size() === s) {
                            console.log(array.size() === s);
                            array = array.extend ();
                        }
                        array[array.size()] = e;
                        return array;
                    };
                };
            applyMethod(a);
            return a;
        };
    }
})();

