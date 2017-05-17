function GameView(fields, user) {
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.conscructor = GameView;

GameView.prototype.init = function() {
    $('#menu-achat').submit(this.waterBought.bind(this))
    this.fields.forEach(function(field, number) {
        $('#irrig-chp' + field.id).click(this.addWater.bind(this, field.id));

        $('#recolt-chp' + field.id).css('color', 'red');

        field.on('harvest-ready', (function(data) {
            $('#recolt-chp' + data.id).css('color', 'green').click(this.harvest.bind(this, field.id));
        }).bind(this))

        field.on('harvest-update', function(data) {
            $('#citerne-champ' + field.id).html(data.water);
            $('#etat-champ' + field.id).html(data.progress);
        })
    }, this);
    this.user.on('infos-update', function(data) {
        $('#harvests').html(data.harvests);
        $('#water').html(data.water);
        $('#money').html(data.money);

    })
}


GameView.prototype.waterBought = function(e) {
    e.preventDefault();
    var liters = $('#eau-qty').val();
    this.emit('water-bought', {
        quantity: liters
    });
}

GameView.prototype.addWater = function(nb) {
    this.emit('watered', {
        number: nb
    });

}

GameView.prototype.harvest = function(nb) {
    this.emit('harvest', {
        number: nb
    });

}