function Field(waterPrice, harvestGain) {
    EventEmitter.call(this);
    this.harvestProgress = 15;
    this.waterSupplie = 3;
    this.consumption = 1;
    this.waterPrice = 1 || waterPrice;
    this.harvestGain = 50 || harvestGain;
    // this.init();
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;


Field.prototype.init = function () {
    // this.fieldReady();
}

// Lorsque le champ est mûr
Field.prototype.fieldReady = function (e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', {
        quantity: liters
    });
}