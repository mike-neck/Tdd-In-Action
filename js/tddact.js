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
    this.drinkCounts = {'コーラ': 5};
    this.drinkPrices = {'コーラ': 120};
    this.sales = 0;
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

VendingMachine.prototype.count = function (name) {
    return this.drinkCounts[name];
};

VendingMachine.prototype.price = function (name) {
    return this.drinkPrices[name];
};

VendingMachine.prototype.isAvailable = function (name) {
    return this.count(name) > 0 && this.price(name) <= this.currentMoney;
};

VendingMachine.prototype.buy = function (name) {
    //TODO availableを呼ぶ
    this.drinkCounts[name] -= 1;
    this.sales += this.drinkPrices[name];
};
