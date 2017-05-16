function GameController(game, user) {
    this.model.game = game;
    this.model.user = user;
}

UserController.prototype.update = function(label, data) {

    if(label == 'recolte_mure') {

        this.model.game.setRecolter(data.recolter);
    }
}