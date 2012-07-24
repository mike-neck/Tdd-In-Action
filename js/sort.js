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
    for (var i in array) {
        if (target === array[i]) {
            return true;
        }
    }
    return false;
};

/**
 * fastContains - search number by . It's cost is O(log N).
 * @param target {Number}
 * @param array {Array}
 * @return {Boolean}
 */
sort.test.fastContains = function (target, array) {
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
    return target === array[left];
};

(function () {
    org.mikeneck.sort.bsort = function (array) {
        var length = array.length, last = length, now;
        for (;last > 0; last -= 1) {
            for (now = 0; now < last - 1; now += 1) {
                if (array[now] > array[now + 1]) {
                    var temp = array[now];
                    array[now] = array[now + 1];
                    array[now + 1] = temp;
                }
            }
        }
    };
    org.mikeneck.sort.ssort = function (array) {
        var length = array.length, now = 0, min, check;
        for (; now < length; now += 1) {
            min = now;
            for (check = now + 1; check < length; check += 1) {
                if (array[min] > array[check]) {
                    min = check;
                }
            }
            var tmp = array[now];
            array[now] = array[min];
            array[min] = tmp;
        }
    };
})();

(function () {
    Array.prototype.compare = Array.prototype.compare || function (array) {
        var isNull = array === null,
            isObject = typeof array === "object",
            isArray = typeof array.length === "number",
            hasSameSize = this.length === array.length,
            length = this.length,
            index = 0,
            allay = this,
            my, your;
        if (isNull) return false;
        if (isObject === false) return false;
        if (isArray === false) return false;
        if (hasSameSize === false) return false;
        for (my = allay[index], your = array[index]; index < length; index += 1, my = allay[index], your = array[index]) {
            if (my instanceof Date) {
                if (my !== your) return false;
            } else if (my instanceof Array) {
                if (my.compare(your) === false) return false;
            } else if (typeof my === "object") {
                if (typeof your === "object") {
                    if (your instanceof Date) return false;
                    for (var i in my) {
                        if (my[i] !== your[i]) return false;
                    }
                }
            } else {
                if (my !== your) return false;
            }
        }
        return true;
    };
})();
