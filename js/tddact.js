/**
 * Created with JetBrains WebStorm.
 * User: mike
 * Date: 12/07/22
 * Time: 11:09
 * To change this template use File | Settings | File Templates.
 */

var VendingMachine = {currentMoney : 0};

VendingMachine.insert = function (coin) {
    this.currentMoney += coin;
}
