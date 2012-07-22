/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/01
 * Time: 10:40
 * To change this template use File | Settings | File Templates.
 */
(function() {
    if (typeof org === 'undefined') {
        org = {};
    } else if (typeof org.mikeneck === 'undefined') {
        org.mikeneck = {};
    } else if (typeof org.mikeneck.sort === 'undefined') {
        org.mikeneck.sort = {};
        org.mikeneck.sort.constArray = [-1, 5, 10, -10, 2, 3, -7, 0];
        org.mikeneck.sort.constArraySorted = [-10, -7, -1, 0, 2, 3, 5, 10];
    }
})();

var sort = {test : {}};

/**
 * get time.
 * @return {String}
 */
sort.ymdhms = function () {
    var date = new Date(),
        object = {
            year :   date.getFullYear(),
            month :  date.getMonth() + 1,
            date :   date.getDate(),
            hour :   date.getHours(),
            minute : date.getMinutes(),
            second : date.getSeconds()},
        twoCharacter = function (arg) {
            if (typeof arg === 'number') {
                return (arg < 10? '0' : '') + arg;
            } else {
                return arg;
            }
        },
        result = 'date : [' +
                object.year + '/' +
                twoCharacter(object.month)  + '/' +
                twoCharacter(object.date)   + ' ' +
                twoCharacter(object.hour)   + ':' +
                twoCharacter(object.minute) + ':' +
                twoCharacter(object.second) + ']';
    return result;
};
/**
 * normalContains - search number lineally. It's cost is O(N).
 * @param target {Number}
 * @param array {Array}
 * @return {Boolean}
 */
sort.test.normalContains = function (target, array) {
    console.log(sort.ymdhms());
    for (var i in array) {
        if (target === array[i]) {
            console.log(sort.ymdhms());
            return true;
        }
    }
    console.log(sort.ymdhms());
    return false;
};

/**
 * fastContains - search number by . It's cost is O(log N).
 * @param target {Number}
 * @param array {Array}
 * @return {Boolean}
 */
sort.test.fastContains = function (target, array) {
    console.log(sort.ymdhms());
    if (array.length === 0) {
        return false;
    }

    var left = 0,
        right = array.length;

    while (left + 1 < right) {
        var size = right - left,
            modular = size % 2,
            mid = left + (size - modular) / 2,
            compare = array[mid],
            test = target < compare;

        if (test) {
            right = mid;
        } else {
            left = mid;
        }
    }
    console.log(sort.ymdhms());
    return target === array[left];
}
