function View(game) {
    this.game = game;
}

View.prototype.waterBought = function(data) {
    liters = $();
    this.emit('water-bought', { quantity: liters })
}