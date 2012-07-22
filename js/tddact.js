/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */

var VendingMachine = function() {
    this.insertedCoins = {10 : 0, 50 : 0, 100 : 0, 500 : 0, 1000 : 0};
    this.currentMoney = 0;
};

VendingMachine.prototype.insert = function (coin) {
    this.currentMoney += coin;
    this.insertedCoins[coin] += 1;
    return this;
};

VendingMachine.prototype.comeback = function () {
    var comebackMoneys = this.insertedCoins;
    this.insertedCoins = {10 : 0, 50 : 0, 100 : 0, 500 : 0, 1000 : 0};
    this.currentMoney = 0;
    return comebackMoneys;
};
