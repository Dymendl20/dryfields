window.onload = function() {
    var config = new Config(1, 50)
    var fields = [new Field(), new Field(), new Field()];
    var user = new User();
    var view = new GameView(fields, user);
    var gameController = new GameController(fields, user, view, config);
}