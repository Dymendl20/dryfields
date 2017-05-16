function GameController(fields, user, view) {
    EventEmitter.call(this);
    this.fields = fields;
    this.user = user;
    this.view = view;
    console.log(this.view);
    this.gameOverTimer = setTimeout(this.gameOver, 900000);
    this.init();
}

GameController.prototype = Object.create(EventEmitter.prototype);
GameController.prototype.conscructor = GameController;


GameController.prototype.init = function () {
    console.log(this.user)
    this.view.on('water-bought', function (data) {
        this.user.water += parseInt(data.quantity);
        this.user.money -= parseInt(1 * data.quantity)
        console.log(this.user)
    }.bind(this))
}

GameController.prototype.waterComsuptionTimer = function () {
    this.interval = setInterval(this.waterComsuption, 1000)
}

GameController.prototype.waterComsuption = function () {
    this.fields.forEach(function (field) {
        field.waterSupplie -= field.comsuption;
        field.comsuption = Math.pow(parseFloat(field.comsuption), 2) / 800000 + 1
        if (field.comsuption > 2) {
            field.comsuption = 2;
        }
    }, this);
}

GameController.prototype.looseCondition = function () {
    if (this.fields[0].harvestProgress === 0 && this.fields[1].harvestProgress === 0 && this.fields[2].harvestProgress === 0) {
        this.gameOver();
    }

}

GameController.prototype.gameOver = function () {
    console.log('Game Over');
    // ouvrir la fenètre permettant de rentrer son nom et envoyer le score au serveur
}


GameController.prototype.update = function (label, data) {

    if (label == 'recolte_mure') {

        this.model.game.setRecolter(data.recolter);
    }
}