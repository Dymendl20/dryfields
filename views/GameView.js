function GameView(game) {
    EventEmitter.call(this);
    this.game = game;
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.conscructor = GameView;

GameView.prototype.init = function() {
    $('#menu-achat').submit(this.waterBought.bind(this))
    $('#popin-eau').click(this.buyWater.bind(this))
}

GameView.prototype.waterBought = function(e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', {quantity: liters});
}

GameView.prototype.buyWater= function(){
    var targetElement;
    targetElement = document.getElementById("achat-eau") ;
    if ($('#achat-eau').css( "visibility", "hidden" ))
    {
        $('#achat-eau').show('Acheter');
    } else {
        $('#achat-eau').hide('Acheter');
    }

    // $('#achat-eau').hide('Acheter');
    // $('#achat-eau').show('Acheter');

}







