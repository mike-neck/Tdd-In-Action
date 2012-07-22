/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/16
 * Time: 15:25
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function () {
    module ("Single List Node");
    test("initial value test", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (1);
        equal (node.value, 1, "initial value is 1");
        equal (node.next, null, "initial next is null");
    });

    test ("object case", function () {
        var ListNode = org.mikeneck.list.SingleListNode;
        try {
            new ListNode ({name : "object"});
            equal (false, true, "object cannot be get instance.");
        } catch (e) {
            equal (e.message.indexOf("Type Error"), 0, "object cannot be get instance.");
        }
    });

    test ("string case", function () {
        var ListNode = org.mikeneck.list.SingleListNode;
        try {
            new ListNode ("string");
            equal (false, true, "string cannot be get instance.");
        } catch (e) {
            equal (e.message.indexOf("Type Error"), 0, "object cannot be get instance.");
        }
    });

    test ("compare function", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            Small = org.mikeneck.list.Small,
            Equal = org.mikeneck.list.Equal,
            Large = org.mikeneck.list.Large,
            node = new ListNode (3);

        equal (node.compare(2), Large, "3 is larger than 2.");
        equal (node.compare(3), Equal, "3 equals to 3");
        equal (node.compare(4), Small, "3 is smaller than 4");
    });

    test ("setting next element", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var next = node.setNext(4);
        equal (node.getNext().getValue(), 4, "the next of 3 is 4.");
        equal (next.getValue(), 4, "setNext returns next element");
    });

    test ("equality test", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node1 = new ListNode (3),
            node2 = new ListNode (3);

        deepEqual (node2, node1, "value and next are same, they are thought to be same.");
    });

    module("Single Ascending List");
    test ("initialize list", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode;

        var list = new List (2);
        deepEqual (list.first, new ListNode(2), "A list initialized with number has element 2 as first.");
    });

    test ("initialize list with Node", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var list = new List (node);
        deepEqual (list.first, node, "A list initialized with a node has it as a first element.");
    });

    test ("insert element at first position", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var list = new List (node);
        deepEqual (list.first, node, "A list initialized with a node has it as a first element.");

        list.add (2);
        var expected = new ListNode(2);
        expected.next = node;
        deepEqual (list.first, expected, "inserting 2 into [3] becomes [2,3].");
    });

    test ("insert element at last position", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            list = new List (3);

        var node = list.add (5);
        equal (list.first.getValue(), 3, "first node's value is 3");
        deepEqual (list.first.getNext(), node, "second node is 5");
    });

    test ("insert element between all list", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            list = new List (3),
            last = list.add(5);

        var node = list.add(4);
        deepEqual (node.getNext(), last, "inserting 4 into [3,5] becomes [3,4,5]");
    });
});

