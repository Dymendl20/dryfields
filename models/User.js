function User() {
    EventEmitter.call(this)
    this.score = 0;
    this.money = 50;
    this.water = 3;
}

Field.prototype = Object.create(EventEmitter.prototype);
Field.prototype.constructor = Field;