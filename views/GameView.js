function GameView(game) {
    EventEmitter.call(this);
    this.game = game;
    this.init();
}

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.conscructor = View;

View.prototype.init = function() {
    $('#menu-achat').submit(this.waterBought.bind(this))
}

View.prototype.waterBought = function(e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', { quantity: liters });
}