/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/16
 * Time: 14:36
 * To change this template use File | Settings | File Templates.
 */

(function(){
    if (typeof org === "undefined") {
        org = {};
    }
    if (typeof org.mikeneck === "undefined") {
        org.mikeneck = {};
    }
    var temporary;
    if (typeof org.mikeneck.list !== "undefined") {
        temporary = org.mikeneck.list;
    }
    org.mikeneck.list = {};
    org.mikeneck.list.Large = {value :  1, text : "Large"};
    org.mikeneck.list.Equal = {value :  0, text : "Equal"};
    org.mikeneck.list.Small = {value : -1, text : "Small"};
    org.mikeneck.list.SingleListNode = function (item) {
        var type = typeof item;
        if (type !== "number" &&
            (type !== "object" || !(item instanceof org.mikeneck.list.SingleListNode))) {
            throw {
                message : "Type Error! Type [" + type + "] cannot become ListNode.",
                item : item
            };
        }
        this.value = type === "number"? item : item.getValue();
        this.next = null;
        this.compare = function (comparator) {
            var type = typeof comparator;
            if (type !== "number") {
                throw {
                    message : "Type Error! Type [" + type + "] cannot be compared with number.",
                    item : comparator
                };
            }
            var isLarge = this.value > comparator,
                equal = this.value === comparator,
                Large = org.mikeneck.list.Large,
                Equal = org.mikeneck.list.Equal,
                Small = org.mikeneck.list.Small;
            if (isLarge) {
                return Large;
            } else if (equal) {
                return Equal;
            } else {
                return Small;
            }
        };
        this.setNext = function (item) {
            var ListNode = org.mikeneck.list.SingleListNode,
                nextItem = new ListNode(item),
                temporaryNext = this.next;
            if (temporaryNext) {
                nextItem.next = temporaryNext;
            }
            this.next = nextItem;
            return nextItem;
        };
        this.getNext = function () {
            return this.next;
        };
        this.getValue = function () {
            return this.value;
        };
    };
    org.mikeneck.list.SingleAscendingList = function (item) {
        if (typeof item !== "number" &&
            !(typeof item === "object" && item instanceof org.mikeneck.list.SingleListNode)) {
            throw {
                message : "Type Error! argument type [" + (typeof item) + "] cannot applied",
                item : item
            };
        }
        var node,
            ListNode = org.mikeneck.list.SingleListNode;
        if (typeof item === "number") {
            node = new ListNode (item);
        } else {
            node = item;
        }
        this.first = node;
        this.add = function (element) {
            var type = typeof element,
                ListNode = org.mikeneck.list.SingleListNode;
            if (type !== "number" &&
                (type !== "object" || !(element instanceof ListNode))) {
                throw {
                    message : "Type Error! argument type [" + type + "] cannot be added to list.",
                    item : element
                };
            }
            var node = this.first,
                Small = org.mikeneck.list.Small,
                Large = org.mikeneck.list.Large,
                next = type === "number" ? element : element.getValue(),
                temporary;
            if (node.compare(next) === Large) {
                var newElement = new ListNode (next);
                newElement.setNext(node);
                this.first = newElement;
                return newElement;
            }
            while (node.compare(next) === Small) {
                temporary = node.getNext();
                if (temporary === null) {
                    return node.setNext(next);
                }
                node = temporary;
            }
            console.log (temporary.getValue());
            return temporary.setNext(next);
        };
    };
})();