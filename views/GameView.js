function GameView(fields, user) {
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
    this.init();
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.conscructor = GameView;

GameView.prototype.init = function() {
    $('#harvests').html(this.user.harvests);
    $('#water').html(this.user.water);
    $('#money').html(this.user.money);

    $('#menu-achat').submit(this.waterBought.bind(this))
    this.fields.forEach(function(field, number) {
        $('#citerne-champ' + field.id).html(field.waterSupplie);
        $('#etat-champ' + field.id).html(field.harvestProgress);

        $('#irrig-chp' + field.id).click(this.addWater.bind(this, field.id));

        $('#recolt-chp' + field.id).prop("disabled", true).css('color', 'red').click(this.harvest.bind(this, field.id));

        field.on('harvest-ready', (function(data) {
            $('#recolt-chp' + data.id).css('color', 'green').prop("disabled", false);
        }).bind(this))

        field.on('harvest-update', function(data) {
            $('#citerne-champ' + field.id).html(data.water);
            $('#etat-champ' + field.id).html(data.progress);
        })

        field.on('update-water', function() {
            $('#citerne-champ' + field.id).html(field.waterSupplie);
        })
    }, this);

    this.user.on('update-harvests', (function() {
        $('#harvests').html(this.user.harvests);
    }).bind(this));
    this.user.on('update-water', (function() {
        $('#water').html(this.user.water);
    }).bind(this));
    this.user.on('update-money', (function() {
        $('#money').html(this.user.money);
    }).bind(this));
}


GameView.prototype.waterBought = function(e) {
    e.preventDefault();
    $('#water').html(this.user.water)
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
    console.log('harvest field ' + nb);
    $('#recolt-chp' + nb).css('color', 'red');
    $('#recolt-chp' + nb).prop("disabled", true);

    this.emit('harvest', {
        number: nb
    });

}