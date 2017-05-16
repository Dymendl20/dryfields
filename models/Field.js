function Field() {
    EventEmitter.call(this);
    this.fieldReady();
    this.init();
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

// Lorsque le champ est mûre

Field.prototype.init = function() {

}

Field.prototype.fieldReady = function(e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', { quantity: liters });
}

