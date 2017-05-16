function Field() {
    EventEmitter.call(this);

    this.init();
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;

// Lorsque le champ est mûre

Field.prototype.init = function() {
    
}