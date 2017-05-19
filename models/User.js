function User() {
    EventEmitter.call(this)
    this.money = 50;
    this.water = 3;
    this.harvests = 0;
}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.setWater = function(water) {
    this.water = water;
    this.emit('update-water');
}

User.prototype.setMoney = function(money) {
    this.money = Math.floor((money) * 10) / 10;
    this.emit('update-money');
}

User.prototype.setHarvests = function(harvests) {
    this.harvests = harvests;
    this.emit('update-harvests');
}

User.prototype.update = function() {
    this.emit('infos-update', {
        harvests: this.harvests,
        water: this.water,
        money: this.money
    })
}

User.prototype.postScore = function(username) {
    $.ajax({
        // method: "POST",
        // url: 'http://10.1.108.8:3000/scores',
        // data: { name: username, score: this.harvests }
        method: "GET",
        url: 'http://10.1.108.8:3000/scores',
        success: (function(resp) {
            this.emit('scores', resp);
        }).bind(this)
    })
}