function GameController(field, user) {
    this.field = field;
    this.user = user;
}

UserController.prototype.update = function(label, data) {

    if(label == 'recolte_mure') {

        this.model.game.setRecolter(data.recolter);
    }
}