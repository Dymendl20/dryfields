function User() {
    EventEmitter.call(this)
    this.score = 0;
    this.money = 50;
    this.water = 3;
    this.harvests = 0;
}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.update = function() {
    this.emit('infos-update', {
        harvests: this.harvests,
        water: this.water,
        money: this.money
    })
}