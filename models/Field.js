var i = 1;

function Field() {
    EventEmitter.call(this);
    this.id = i;
    i++;
    this.harvestProgress = 5;
    this.waterSupplie = 3;
    this.consumption = 1;
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

Field.prototype.setWater = function(water) {
    this.waterSupplie = Math.floor((water) * 10) / 10;
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