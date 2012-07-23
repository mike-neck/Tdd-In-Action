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
        this.isLargerThan = function (comparator) {
            var result = this.compare (comparator);
            return result === org.mikeneck.list.Large;
        };
        this.isSmallerThan = function (comparator) {
            var result = this.compare (comparator);
            return result === org.mikeneck.list.Small;
        };
        this.equals = function (comparator) {
            var result = this.compare (comparator);
            return result === org.mikeneck.list.Equal;
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
                insertElement = type === "number" ? element : element.getValue(),
                temporary;
            if (node.isLargerThan(insertElement) || node.equals(insertElement)) {
                var newElement = new ListNode (insertElement);
                newElement.setNext(node);
                this.first = newElement;
                return this;
            }
            while (node && node.isSmallerThan(insertElement)) {
                temporary = node;
                node = node.getNext();
            }
            if (node === null) {
                temporary.setNext(new ListNode(insertElement));
            } else {
                var newNode = new ListNode(insertElement);
                temporary.setNext(newNode);
                newNode.setNext(node);
            }
            return this;
        };
    };
    org.mikeneck.list.DoubleLinkedListNode = function (item) {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            type = typeof item;
        if (this instanceof Node === false) {
            return new Node (item);
        }
        if (type !== "number") {
            throw {
                message : "Type Error! Type [" + type + "] cannot become ListNode.",
                item : item
            };
        }
        this.value = type === "number"? item : item.getValue();
        this.prev = null;
        this.next = null;
        this.setNext = function (item) {
            if (item instanceof org.mikeneck.list.DoubleLinkedListNode === false) {
                throw {
                    message : "Type Error! argument type [" + type + "] cannot be added to list.",
                    item : item
                };
            }
            this.next = item;
            item.prev = this;
        };
        this.setPrev = function (item) {
            if (item instanceof org.mikeneck.list.DoubleLinkedListNode === false) {
                throw {
                    message : "Type Error! argument type [" + type + "] cannot be added to list.",
                    item : item
                };
            }
            this.prev = item;
            item.next = this;
        };
        this.getValue = function () {
            return this.value;
        };
        this.getNext = function () {
            return this.next;
        };
        this.getPrev = function () {
            return this.prev;
        };
    };
    org.mikeneck.list.DoubleLinkedList = function (item) {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            node = new Node(item);

        this.top = node;
        this.last = node;
        this.add = function (element) {
            var newNode = new Node (element);
            this.top.setNext(newNode);
            this.last = newNode;
        };
    };
})();
