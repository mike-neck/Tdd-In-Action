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

    module("ジュースを保持し、それにアクセスできる", env);
    test("コーラの本数が5本", function () {
        equal(this.vm.count('コーラ'), 5);
    });

    test("コーラの値段が 120 円", function () {
        equal(this.vm.price('コーラ'), 120);
    });

    var env120 = {
        setup: function() {
            this.vm = new VendingMachine().insert(100).insert(10).insert(10);
        },
    };

    module("120円入っているとき", env120);
    test("120円投入時にコーラが購入できることを確認", function () {
        ok(this.vm.isAvailable('コーラ'));
    });

    var envCola = {
        setup: function() {
            this.vm = new VendingMachine().insert(100).insert(10).insert(10).insert(10);
            this.vm.buy("コーラ");
        },
    };

    module("130円入れてコーラを購入したとき", envCola);
    test("在庫がひとつ減る",function () {
        equal (this.vm.count("コーラ"), 4);
    });

    test("売上金額が増える", function () {
        equal(this.vm.sales, 120);
    });

    test ("投入金額を減らす", function () {
        equal(this.vm.currentMoney, 10);
    });

    var env100 = {
        setup: function() {
            this.vm = new VendingMachine().insert(100);
        },
    };

    module("100円入っているとき", env100);
    test("コーラは購入できないと通知される", function(){
        equal(this.vm.isAvailable('コーラ'), false);
    });

    test("コーラを購入しようとする", function(){
        this.vm.buy('コーラ');
        equal(this.vm.count("コーラ"), 5, '在庫は変化しない');
        equal(this.vm.sales, 0, '売上は増えない');
        equal(this.vm.currentMoney, 100, '投入金額は減らない');
    });

});
