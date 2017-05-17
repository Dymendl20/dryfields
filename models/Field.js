var i = 1;

function Field() {
    EventEmitter.call(this);
    this.id = i;
    i++;
    this.harvestProgress = 10;
    this.waterSupplie = 300;
    this.consumption = 1;
    this.waterPrice = 1;
    this.harvestGain = 50;
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.setWater = function(water) {
    this.waterSupplie = water;
    this.emit('update-water');
}

Field.prototype.update = function() {
    this.emit('harvest-update', {
        progress: this.harvestProgress,
        water: this.waterSupplie
    })
}

// Lorsque le champ est mûr
Field.prototype.fieldReady = function() {
    if (this.harvestProgress === 100) {
        this.emit('harvest-ready', {
            id: this.id
        });
    }
}