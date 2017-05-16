function GameView(field) {
    EventEmitter.call(this);
    this.field = field;
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.conscructor = GameView;

GameView.prototype.init = function() {
    $('#menu-achat').submit(this.waterBought.bind(this))
}

GameView.prototype.waterBought = function(e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', { quantity: liters });
}