/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    module("投入金額をそのまま表示する", {
        setup: function() {
            this.vm = new VendingMachine();
        },
        teardown: function() {
            this.vm = null;
        }
    });
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
});
