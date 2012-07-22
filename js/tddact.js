/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */

var MoneyBag = function () {
    this.coins = {10 : 0, 50 : 0, 100 : 0, 500 : 0, 1000 : 0};
};

MoneyBag.prototype.add = function (coin) {
    this.coins[coin] += 1;
};

var VendingMachine = function() {
    this.insertedCoins = new MoneyBag();
    this.currentMoney = 0;
};

VendingMachine.prototype.insert = function (coin) {
    if ($.inArray(coin, [10,50,100,500,1000])!= -1){
        this.currentMoney += coin;
        this.insertedCoins.add(coin);
        return this;
    } else {
        throw coin;
    }
};

VendingMachine.prototype.comeback = function () {
    var comebackMoneys = this.insertedCoins.coins;
    this.insertedCoins = new MoneyBag();
    this.currentMoney = 0;
    return comebackMoneys;
};
