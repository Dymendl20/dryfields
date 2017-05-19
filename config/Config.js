function Config() {}

Config.prototype.getCurrencies = function(cb) {
    $.ajax('http://10.1.108.8:3000/sales/currency', {
        method: 'GET',
        success: (function(json) {
            this.harvestGain = 20 * json.currencies.sales;
            this.waterPrice = json.currencies.purchase;
            if (cb) {
                cb();
            }
        }).bind(this)
    });
}