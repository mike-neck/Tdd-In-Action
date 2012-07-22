/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */

var VendingMachine = function() {
    this.currentMoney = 0;
}

VendingMachine.prototype.insert = function (coin) {
    this.currentMoney += coin;
    return this;
}

VendingMachine.prototype.comeback = function () {
    var c = this.currentMoney;
    this.currentMoney = 0;
    return c;
}
