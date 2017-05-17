window.onload = function() {
    var fields = [new Field(), new Field(), new Field()];
    var user = new User();
    var view = new GameView(fields, user);
    var gameController = new GameController(fields, user, view);
}