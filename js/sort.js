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
    org.mikeneck.sort.Order = function (compare, copy) {
        if (this instanceof org.mikeneck.sort.Order === false) {
            return new Order (compare, copy);
        }
        this.compare = compare;
        this.copy = copy;
    };
    org.mikeneck.sort.Order.prototype.add = function (order) {
        if (order instanceof org.mikeneck.sort.Order === false) {
            throw {
                message : 'Type of [' + order + '] is not Order!',
                item : order
            };
        }
        this.compare += order.compare;
        this.copy += order.copy;
        return this;
    };
    org.mikeneck.sort.Order.prototype.incrementCompare = function () {
        this.compare += 1;
    };
    org.mikeneck.sort.Order.prototype.incrementCopy = function () {
        this.copy += 1;
    };
    org.mikeneck.sort.bsort = function (array) {
        var length = array.length,
            last = length,
            now,
            compare = 0,
            copy = 0,
            Order = org.mikeneck.sort.Order;
        for (;last > 0; last -= 1) {
            for (now = 0; now < last - 1; now += 1) {
                compare += 1;
                if (array[now] > array[now + 1]) {
                    copy += 1;
                    var temp = array[now];
                    array[now] = array[now + 1];
                    array[now + 1] = temp;
                }
            }
        }
        return new Order (compare, copy);
    };
    org.mikeneck.sort.ssort = function (array) {
        var length = array.length,
            now = 0,
            min,
            check,
            compare = 0,
            copy = 0,
            Order = org.mikeneck.sort.Order;
        for (; now < length; now += 1) {
            min = now;
            for (check = now + 1; check < length; check += 1) {
                compare += 1;
                if (array[min] > array[check]) {
                    min = check;
                }
            }
            copy += 1;
            var tmp = array[now];
            array[now] = array[min];
            array[min] = tmp;
        }
        return new Order (compare, copy);
    };
    org.mikeneck.sort.isort = function (array) {
        var length = array.length,
            now = 1,
            operand,
            comparison = 0,
            copy = 0,
            Order = org.mikeneck.sort.Order;
        for (; now < length; now += 1) {
            operand = now;
            while (operand >0) {
                comparison += 1;
                if (array[operand - 1] < array[operand]) {
                    break;
                }
                copy += 1;
                var tmp = array[operand - 1];
                array[operand - 1] = array[operand];
                array[operand] = tmp;
                operand -= 1;
            }
        }
        return new Order (comparison, copy);
    };
    org.mikeneck.sort.msort = function (array) {
        var length = array.length,
            sort = function (list, left, right){
                var size = right - left,
                    odd = size % 2,
                    mid = left + (right - left - odd) / 2,
                    Order = org.mikeneck.sort.Order,
                    merge = function (ary, lft, mdl, rit) {
                        var size = rit - lft,
                            work = new Array (size),
                            index = 0,
                            lIndex = lft,
                            rIndex = mdl,
                            Order = org.mikeneck.sort.Order,
                            compare = 0, copy = 0;
                        while (lIndex < mdl && rIndex < rit) {
                            compare += 1;
                            if (ary[lIndex] < ary[rIndex]) {
                                copy += 1;
                                work[index ++] = ary[lIndex ++];
                            } else {
                                copy += 1;
                                work[index ++] = ary[rIndex ++];
                            }
                        }
                        while (lIndex < mdl) {
                            copy += 1;
                            work [index ++] = ary[lIndex ++];
                        }
                        while (rIndex < rit) {
                            copy += 1;
                            work [index ++] = ary[rIndex ++];
                        }
                        for (index = 0; index < size; index ++) {
                            copy += 1;
                            ary [lft + index] = work [index];
                        }
                        return new Order(compare, copy);
                    };
                if (size <= 1) return new Order(0, 0);
                var order = arguments.callee (list, left, mid);
                order.add(arguments.callee (list, mid, right));
                return order.add(merge(list, left, mid, right));
            };
        return sort (array, 0, length);
    };
    org.mikeneck.sort.qsort = function (array) {
        var sort = function (ary, left, right){
            var size = right - left,
                order = new org.mikeneck.sort.Order(0, 0),
                pivot = function (ar, lft, rit) {
                    var size = rit - lft,
                        tmp = ar[lft],
                        index = lft + 1;
                    if (size <= 1) return -1;
                    for (; index < rit; index += 1){
                        if (ar[index] < tmp) {
                            order.incrementCompare();
                            return index;
                        } else if (ar[index] > tmp) {
                            order.incrementCompare();
                            order.incrementCompare();
                            return lft;
                        }
                        order.incrementCompare();
                        order.incrementCompare();
                    }
                    return -1;
                },
                part = function (ar, lft, rit, piv) {
                    var lIndex = lft,
                        rIndex = rit - 1;
                    while (lIndex < rIndex) {
                        while (lIndex < rit && ar[lIndex] <= piv) {
                            order.incrementCompare();
                            lIndex += 1;
                        }
                        while (lft < rIndex && piv < ar[rIndex]) {
                            order.incrementCompare();
                            rIndex -= 1;
                        }
                        if (lIndex < rIndex) {
                            var tmp = ar[lIndex];
                            ar[lIndex] = ar[rIndex];
                            ar[rIndex] = tmp;
                            order.incrementCopy();
                        }
                    }
                    return rIndex + 1;
                },
                pivotalPoint,
                mid;
            if (size <= 1) return order;
            pivotalPoint = pivot(ary, left, right);
            if (pivotalPoint < 0) return order;
            mid = part(ary, left, right, ary[pivotalPoint]);
            order.add(arguments.callee (ary, left, mid));
            order.add(arguments.callee (ary, mid, right));
            return order;
        };
        return sort(array, 0, array.length);
    };
    org.mikeneck.sort.hsort = function (array) {
        var Heap = function (length) {
                this.position = 0;
                this.array = new Array(length);
            },
            length = array.length,
            index = 0,
            idx = 0,
            heap = new Heap(length);

        Heap.prototype.push = function (item) {
            var condition = this.array.length <= this.position,
                pos = this.position++
        };
        Heap.prototype.pop = function () {

        };
        for (; index < length; index += 1) {
            heap.push(array[index]);
        }
        for (; idx < length; idx += 1) {
            array[idx] = heap.pop();
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
    Array.prototype.copy = function () {
        var length = this.length,
            from = this,
            to = new Array(length),
            index = 0;

        for (; index < length; index += 1) {
            to[index] = from[index];
        }
        return to;
    };
})();
