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
    this.currentMoney = 0;
    this.drinkCounts = {'コーラ': 5, 'RedBull' : 5};
    this.drinkPrices = {'コーラ': 120, 'RedBull' : 200};
    this.sales = 0;
};

VendingMachine.prototype.insert = function (coin) {
    if ($.inArray(coin, [10,50,100,500,1000])!= -1){
        this.currentMoney += coin;
        return this;
    } else {
        throw coin;
    }
};

VendingMachine.prototype.comeback = function () {
    var c = this.currentMoney;
    this.currentMoney = 0;
    return c;
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
    if (this.isAvailable(name)) {
        this.drinkCounts[name] -= 1;
        this.sales += this.drinkPrices[name];
        this.currentMoney -= this.drinkPrices[name];
    }
};

VendingMachine.prototype.availableList = function () {
    var list = [];
    var _this = this;
    $.each(this.drinkPrices, function(name, value) {
        if (_this.isAvailable(name)) {
            list.push(name);
        }
    });
    return list;
}