/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {

    module("投入金額をそのまま表示する");
    test("10円を表示する", function () {
        VendingMachine.insert(10);

        equal (VendingMachine.currentMoney, 10, "10円入れたから10円");
    });
});
