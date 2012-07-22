/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    var env = {
        setup: function() {
            this.vm = new VendingMachine();
        },
        teardown: function() {
            this.vm = null;
        }
    };

    module("投入金額をそのまま表示する", env);
    test("10円を表示する", function () {
        this.vm.insert(10);

        equal (this.vm.currentMoney, 10, "10円入れたから10円");
    });
    test("100円を表示する", function () {
        this.vm.insert(100);

        equal (this.vm.currentMoney, 100, "100円入れたから100円");
    });
    test("1000円を表示する", function () {
        this.vm.insert(1000);

        equal (this.vm.currentMoney, 1000, "1000円入れたから1000円");
    });

    test("10円と50円の合計", function () {
        this.vm.insert(50).insert(10);

        equal (this.vm.currentMoney, 60, "10円と50円の合計は60円");
    });

    module("残金を返却する", env);
    test("100円と50円を入れてから返却", function () {
        this.vm.insert(100).insert(50);

        deepEqual (this.vm.comeback(), {10 : 0, 50 : 1, 100 : 1, 500 : 0, 1000 : 0});
        equal (this.vm.currentMoney, 0, "内部金額はクリア");
        deepEqual (this.vm.insertedCoins, new MoneyBag());
    });

    module("扱えないオブジェクト", env);
    test("1円使うとエラー", function () {
        try {
            this.vm.insert(1);
        } catch (e) {
            equal (e, 1, "1円使うとエラー");
        }
    });

    test("ねこみみ投入するとエラー", function () {
        try {
            this.vm.insert("ねこみみ");
        } catch (e) {
            equal (e, "ねこみみ", "変なもの入れるとエラー");
        }
    });
});
